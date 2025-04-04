const Brand=require("../models/brandModel");
const User=require("../models/userModel");
const asyncHandler=require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodb');


const createBrand=asyncHandler(async(req,res)=>{
    try{
        const newBrand=await Brand.create(req.body);
        res.json(newBrand)
    } catch(error){
        throw new Error(error)
    }
})

const updateBrand=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)
    try{
        const updateBrand=await Brand.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updateBrand)
    } catch(error){
        throw new Error(error)
    }
})

const deleteBrand= asyncHandler(async (req, res) => {
    const { id } = req.params;  
    validateMongoDbId(id);  

    try {
        const category = await Brand.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Brand not found" });
        }
        
        await Brand.findByIdAndDelete(id);
        res.json({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;  // ✅ Extract 'id' from request params
    validateMongoDbId(id);  // ✅ Validate ID format

    try {
        const brand = await Brand.findById(id);
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.json(brand);
    } catch (error) {
        throw new Error(error);
    }
});


const getallBrand=asyncHandler(async(req,res)=>{
    try{
        const getallBrand=await Brand.find()
        res.json(getallBrand)
    } catch(error){
        throw new Error(error)
    }
})


module.exports={createBrand,deleteBrand,updateBrand,getBrand, getallBrand}