const PCategory = require("../models/prodcategoryModel"); 
const User=require("../models/userModel");
const asyncHandler=require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodb');


const createCategory=asyncHandler(async(req,res)=>{
    try{
        const newCategory=await PCategory.create(req.body);
        res.json(newCategory)
    } catch(error){
        throw new Error(error)
    }
})

const updateCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)
    try{
        const updateCategory=await PCategory.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updateCategory)
    } catch(error){
        throw new Error(error)
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategory = await PCategory.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted successfully", deletedCategory });
    } catch (error) {
        throw new Error(error);
    }
});


const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const category = await PCategory.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        throw new Error(error);
    }
});


const getallCategory=asyncHandler(async(req,res)=>{
    try{
        const getallCategory=await PCategory.find()
        res.json(getallCategory)
    } catch(error){
        throw new Error(error)
    }
})


module.exports={createCategory,deleteCategory,updateCategory,getCategory, getallCategory}