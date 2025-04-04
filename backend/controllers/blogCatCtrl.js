const BCategory=require("../models/blogCatModel");
const asyncHandler=require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodb');


const createCategory=asyncHandler(async(req,res)=>{
    try{
        const newCategory=await BCategory.create(req.body);
        res.json(newCategory)
    } catch(error){
        throw new Error(error)
    }
})

const updateCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)
    try{
        const updateCategory=await BCategory.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updateCategory)
    } catch(error){
        throw new Error(error)
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;  // ✅ Get id from req.params
    validateMongoDbId(id);  // ✅ Validate ID

    try {
        const category = await BCategory.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        
        await BCategory.findByIdAndDelete(id);
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    validateMongoDbId(id);  

    try {
        const category = await BCategory.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const getallCategory=asyncHandler(async(req,res)=>{
    try{
        const getallCategory=await BCategory.find()
        res.json(getallCategory)
    } catch(error){
        throw new Error(error)
    }
})


module.exports={createCategory,deleteCategory,updateCategory,getCategory, getallCategory}