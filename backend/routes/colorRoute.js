const express=require("express")
const {authMiddleware,isAdmin}=require("../middlewares/authMiddleware.js");
const { createColor,deleteColor,updateColor,getColor, getallColor } = require("../controllers/colorCtrl.js")
const router=express.Router()

router.post('/',authMiddleware,isAdmin,createColor)

router.put('/:id',authMiddleware,isAdmin,updateColor)
router.get('/:id',getColor)
router.get('/',getallColor)
router.delete('/:id',authMiddleware,isAdmin,deleteColor)

module.exports=router