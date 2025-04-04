const Coupon =require('../models/couponModel.js');
const validateMongoDbId = require('../utils/validateMongodb');
const asyncHandler=require('express-async-handler')


const createCoupon = asyncHandler(async (req, res) => {
    try {
        const { name, expiry, discount } = req.body;

        if (!name || !expiry || !discount) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Convert expiry to Date format
        const formattedExpiry = new Date(expiry);
        if (isNaN(formattedExpiry.getTime())) {
            return res.status(400).json({ message: "Invalid expiry date format. Use YYYY-MM-DD or ISO format." });
        }

        const newCoupon = new Coupon({
            name,
            expiry: formattedExpiry,
            discount
        });

        await newCoupon.save();

        res.status(201).json(newCoupon);
    } catch (error) {
        console.error("Error saving coupon:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


const getAllCoupons=asyncHandler(async(req,res)=>{
    try{

        const Coupons= await Coupon.find();
        res.json(Coupons);

    }catch(error){
        throw new Error(error)
    }
})

const updateCoupon=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id);
    try{

        const updateCoupon= await Coupon.findByIdAndUpdate(id, req.body,{new:true})
        res.json(updateCoupon);

    }catch(error){
        throw new Error(error)
    }
})

const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;  
    validateMongoDbId(id);  

    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(id);
        
        if (!deletedCoupon) {
            return res.status(404).json({ error: "Coupon not found" });
        }

        res.json({ message: "Coupon deleted successfully", deletedCoupon });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports={createCoupon,getAllCoupons,updateCoupon,deleteCoupon};
