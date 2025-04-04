const express=require("express")
const {authMiddleware,isAdmin}=require("../middlewares/authMiddleware.js");
const { createEnquiry,deleteEnquiry,getEnquiry, getallEnquiry,updateEnquiry } = require("../controllers/enqCtrl.js");
const router=express.Router()

router.post('/',authMiddleware,isAdmin,createEnquiry)

router.put('/:id',authMiddleware,isAdmin,updateEnquiry)
router.get('/:id',getEnquiry)
router.get('/',getallEnquiry)
router.delete('/:id',authMiddleware,isAdmin,deleteEnquiry)

module.exports=router