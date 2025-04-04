const Color=require("../models/colorModel");
const User=require("../models/userModel");
const asyncHandler=require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodb');


const createColor=asyncHandler(async(req,res)=>{
    try{
        const newColor=await Color.create(req.body);
        res.json(newColor)
    } catch(error){
        throw new Error(error)
    }
})

const updateColor=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)
    try{
        const updateColor=await Color.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updateColor)
    } catch(error){
        throw new Error(error)
    }
})

const deleteColor= asyncHandler(async (req, res) => {
    const { id } = req.params;  
    validateMongoDbId(id);  

    try {
        const color = await Color.findById(id);
        if (!color) {
            return res.status(404).json({ error: "Color not found" });
        }
        
        await Color.findByIdAndDelete(id);
        res.json({ message: "Color deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getColor = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    validateMongoDbId(id); 

    try {
        const color = await Color.findById(id);
        if (!color) {
            return res.status(404).json({ message: "Color not found" });
        }
        res.json(color);
    } catch (error) {
        throw new Error(error);
    }
});


const getallColor=asyncHandler(async(req,res)=>{
    try{
        const getallColor=await Color.find()
        res.json(getallColor)
    } catch(error){
        throw new Error(error)
    }
})


module.exports={createColor,deleteColor,updateColor,getColor, getallColor}