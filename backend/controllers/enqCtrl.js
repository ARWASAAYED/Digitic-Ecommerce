const  Enquiry=require("../models/enqModel");
const User=require("../models/userModel");
const asyncHandler=require('express-async-handler')
const validateMongoDbId = require('../utils/validateMongodb');


const createEnquiry=asyncHandler(async(req,res)=>{
    try{
        const newEnquiry=await Enquiry.create(req.body);
        res.json(newEnquiry)
    } catch(error){
        throw new Error(error)
    }
})

const updateEnquiry=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    validateMongoDbId(id)
    try{
        const updateEnquiry=await Enquiry.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updateEnquiry)
    } catch(error){
        throw new Error(error)
    }
})

const deleteEnquiry= asyncHandler(async (req, res) => {
    const { id } = req.params;  
    validateMongoDbId(id);  

    try {
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).json({ error: "Enquiry not found" });
        }
        
        await Enquiry.findByIdAndDelete(id);
        res.json({ message: "Enquiry deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    validateMongoDbId(id); 

    try {
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).json({ message: "Enquiry not found" });
        }
        res.json(enquiry);
    } catch (error) {
        throw new Error(error);
    }
});


const getallEnquiry=asyncHandler(async(req,res)=>{
    try{
        const getallEnquiry=await Enquiry.find()
        res.json(getallEnquiry)
    } catch(error){
        throw new Error(error)
    }
})


module.exports={createEnquiry,deleteEnquiry,getEnquiry, getallEnquiry,updateEnquiry}