const fs=require("fs")
const { promisify } = require("util"); 
const unlinkAsync = promisify(fs.unlink); 
const Blog=require("../models/blogModel");
const User=require("../models/userModel");
const asyncHandler=require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodb');
const { cloudinaryUploadImg } = require('../utils/cloudinary');
const { productImgResize } = require("../middlewares/uploadImage");



const createBlog=asyncHandler(async(req,res)=>{
 try{
    const newBlog=await Blog.create(req.body)
    res.json({newBlog})
 } catch (error){
    throw new Error(error)
 }
});

const updateBlog=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
       const updateBlog=await Blog.findByIdAndUpdate(id,req.body,{new:true});
       res.json(updateBlog)
    } catch (error){
       throw new Error(error)
    }
   });


   const getBlog=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)
    try{
       const getBlog=await Blog.findById(id).populate("likes").populate("dislikes");
       const updateViews=await Blog.findByIdAndUpdate(
        id,
        {
            $inc:{numViews:1}
        },
        {new:true}
       )
       res.json(getBlog)
    } catch (error){
       throw new Error(error)
    }
   });

   const getAllBlogs=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
       const getBlogs=await Blog.find()
       res.json(getBlogs)
    } catch (error){
       throw new Error(error)
    }
   });


   const deleteBlog=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)
    try{
       const deleteBlog=await Blog.findOneAndDelete(id);
       res.json(deleteBlog)
    } catch (error){
       throw new Error(error)
    }
   });

   const liketheBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;

    console.log("Received blogId:", blogId); // Debugging
    if (!blogId) {
        return res.status(400).json({ error: "Blog ID is required" });
    }

    validateMongoDbId(blogId);

    // Find the blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
    }

    const loginUserId = req?.user?._id;
    const isLiked = blog?.isLiked;
    const alreadyDisliked = blog?.dislikes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
    );

    if (alreadyDisliked) {
        await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { dislikes: loginUserId },
                isDisliked: false,
            },
            { new: true }
        );
    }

    if (isLiked) {
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
            },
            { new: true }
        );
        return res.json(updatedBlog);
    } else {
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $push: { likes: loginUserId },
                isLiked: true,
            },
            { new: true }
        );
        return res.json(updatedBlog);
    }
});

const disliketheBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    console.log("Received Blog ID:", blogId);

    if (!blogId) {
        return res.status(400).json({ error: "Blog ID is required" });
    }

    try {
        validateMongoDbId(blogId);
    } catch (error) {
        return res.status(400).json({ error: "Invalid Blog ID" });
    }

    // Find the blog
    const blog = await Blog.findById(blogId);
    if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
    }

    // Find the logged-in user ID
    const loginUserId = req?.user?._id;

    // Check if the user has already disliked the blog
    const alreadyDisliked = blog?.dislikes?.includes(loginUserId);
    const alreadyLiked = blog?.likes?.includes(loginUserId);

    if (alreadyLiked) {
        // Remove like if the user previously liked the blog
        await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
            },
            { new: true }
        );
    }

    if (alreadyDisliked) {
        // If already disliked, remove the dislike and set `isDisLiked: false`
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: { dislikes: loginUserId },
                isDisLiked: false,
            },
            { new: true }
        );
        return res.json(updatedBlog);
    } else {
        // If not disliked before, add dislike and set `isDisLiked: true`
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $push: { dislikes: loginUserId },
                isDisLiked: true,
            },
            { new: true }
        );
        return res.json(updatedBlog);
    }
});


const uploadImages = async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const uploader = (path) => cloudinaryUploadImg(path, "blogs");
        const urls = [];
        const files = req.files;

        for (const file of files) {
            const { path } = file;

            // 🌟 Upload to Cloudinary FIRST
            const newPath = await uploader(path);
            console.log("✅ Uploaded to Cloudinary:", newPath);

            urls.push(newPath);

            // 🌟 Check if the file exists BEFORE trying to delete it
            if (fs.existsSync(path)) {
                fs.unlink(path, (err) => {
                    if (err) {
                        console.error(`❌ Error deleting file: ${path}`, err);
                    } else {
                        console.log(`🗑 Deleted file: ${path}`);
                    }
                });
            } else {
                console.log(`⚠️ File already deleted: ${path}`);
            }
        }

        // 🌟 Update Product with Uploaded Images
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { images: urls.map((file) => file) },
            { new: true }
        );

        res.json(updatedBlog);

    } catch (error) {
        console.error("❌ Upload Error:", error);
        res.status(500).json({ message: "Image upload error", error });
    }
};

module.exports={createBlog,updateBlog,getBlog,getAllBlogs,deleteBlog,liketheBlog,disliketheBlog,uploadImages}