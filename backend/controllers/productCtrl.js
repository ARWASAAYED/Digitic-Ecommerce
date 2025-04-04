const fs=require("fs")
const { promisify } = require("util"); 
const unlinkAsync = promisify(fs.unlink); 
const Product= require("../models/productModel")
const slugify=require("slugify")
const asyncHandler=require('express-async-handler')
const User = require("../models/userModel"); 
const validateMongoDbId = require("../utils/validateMongodb");
const cloudinary = require("cloudinary").v2;
const  {cloudinaryUploadImg,cloudinaryDeleteImg}  = require("../utils/cloudinary");



const createProduct = asyncHandler(async (req, res) => {
    try {
        // Generate slug from title if not provided
        if (!req.body.slug) {
            req.body.slug = slugify(req.body.title, { lower: true, strict: true });
        }

        // Check if product with the same slug already exists
        const existingProduct = await Product.findOne({ slug: req.body.slug });
        if (existingProduct) {
            return res.status(400).json({ error: "Product with this slug already exists." });
        }

        // Create new product
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; 
        if (req.body.title) {
            req.body.slug = slugify(req.body.title, { lower: true, strict: true });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


const deleteProduct = asyncHandler(async (req, res) => {
    try {
       
        const { id } = req.params; 
        const deleteProduct = await Product.findOneAndDelete(id);

        if (!deleteProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(deleteProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getaProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params

    try{
        const findProduct =await  Product.findById(id);
        res.json(findProduct)
        
    }catch (error){
        throw new Error(error)
    }

   
})

const getAllProduct=asyncHandler(async(req,res)=>{

    try{
        //filtering
        const queryObj={...req.query};
        const excludeFields=["page","sort","limit","fields"]
        excludeFields.forEach((el)=>delete queryObj[el])
    // Convert query operators to MongoDB format ($gte, $gt, etc.)
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
    let query = Product.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
    } else {
        query = query.sort("-createdAt"); // Default sort by newest
    }

    // Field limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
    } else {
        query = query.select("-__v"); // Exclude __v by default
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    console.log(page,limit,skip)

    if (req.query.page) {
        const totalDocs = await Product.countDocuments();
        if (skip >= totalDocs) {
            throw new Error("This page does not exist");
        }
    }

    // Execute query
    const products = await query;
    res.json(products);
} catch (error) {
    throw new Error(error);
}

   
})


const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;

    try {
        const user = await User.findById(_id);

        const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);

        if (alreadyAdded) {
            // If product is already in wishlist, remove it (toggle feature)
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { $pull: { wishlist: prodId } }, // Remove from wishlist
                { new: true }
            );
            return res.json({ message: "Removed from wishlist", user: updatedUser });
        } else {
            // If product is not in wishlist, add it
            const updatedUser = await User.findByIdAndUpdate(
                _id,
                { $push: { wishlist: prodId } }, // Add to wishlist
                { new: true }
            );
            return res.json({ message: "Added to wishlist", user: updatedUser });
        }
    } catch (error) {
        throw new Error(error);
    }
});

const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user; 
    const { star, prodId, comment } = req.body; 

    try {
        //  Validate star rating
        if (!star || isNaN(star) || star < 1 || star > 5) {
            return res.status(400).json({ message: "Invalid star rating. Must be between 1 and 5." });
        }

        //  Check if product exists
        const product = await Product.findById(prodId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        //  Ensure ratings array exists
        if (!Array.isArray(product.ratings)) {
            product.ratings = [];
        }

        //  Check if user has already rated
        let alreadyRated = product.ratings.find(
            (rating) => rating.postedby.toString() === _id.toString()
        );

        if (alreadyRated) {
            // Update existing rating using `$elemMatch`
            await Product.updateOne(
                { _id: prodId, "ratings.postedby": _id },
                { $set: { "ratings.$.star": star, "ratings.$.comment": comment } }
            );
        } else {
            // Add new rating
            await Product.findByIdAndUpdate(
                prodId,
                { $push: { ratings: { star, comment, postedby: _id } } },
                { new: true }
            );
        }

        //  Recalculate total rating for the product
        const updatedProduct = await Product.findById(prodId);
        let totalRating = updatedProduct.ratings.length;
        let ratingsum = updatedProduct.ratings
            .map((item) => Number(item.star) || 0)
            .reduce((prev, curr) => prev + curr, 0);

        let actualRating = totalRating > 0 ? Math.round(ratingsum / totalRating) : 0;

        await Product.findByIdAndUpdate(
            prodId,
            { totalrating: actualRating },
            { new: true }
        );

        // Fetch all products with ratings
        const allProducts = await Product.find().populate('ratings.postedby', 'name email');

        res.json({
            message: "Rating updated successfully",
            products: allProducts // Returns all products and their ratings
        });

    } catch (error) {
        console.error("Error in rating function:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
const uploadImages = async (req, res) => {
    const { id } = req.params;

    if (!id || id === "undefined") {
        return res.status(400).json({ message: "Invalid or missing product ID" });
    }

    try {
        validateMongoDbId(id); // Validate MongoDB ID

        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No images provided for upload" });
        }

        const uploadedFiles = await Promise.all(
            files.map(async (file) => {
                const uploadResult = await cloudinaryUploadImg(file.path);
                console.log("✅ Uploaded to Cloudinary:", uploadResult);

                // Delete local file after upload
                if (fs.existsSync(file.path)) {
                    fs.unlink(file.path, (err) => {
                        if (err) console.error(`❌ Error deleting file: ${file.path}`, err);
                        else console.log(`🗑 Deleted file: ${file.path}`);
                    });
                } else {
                    console.log(`⚠️ File not found, skipping deletion: ${file.path}`);
                }

                return uploadResult;
            })
        );

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { images: uploadedFiles },
            { new: true }
        );

        return res.json({
            message: "Images uploaded successfully",
            images: uploadedFiles,
            product: updatedProduct,
        });

    } catch (error) {
        console.error("❌ Upload Error:", error);
        res.status(500).json({ message: "Image upload error", error: error.message });
    }
};




const deleteImages = async (req, res) => {
    const { id } = req.params; // Cloudinary Public ID (without folder)

    if (!id) {
        return res.status(400).json({ message: "Public ID is required for deletion" });
    }

    try {
        const deleted = await cloudinaryDeleteImg(id); // No need to pass folder here
        res.json({ message: " Image deleted successfully", deleted });

    } catch (error) {
        console.error(" Delete Error:", error);
        res.status(500).json({ message: "Error deleting image", error: error.message });
    }
};











module.exports={createProduct, getaProduct,getAllProduct,updateProduct,deleteProduct,addToWishlist,rating,uploadImages,deleteImages}