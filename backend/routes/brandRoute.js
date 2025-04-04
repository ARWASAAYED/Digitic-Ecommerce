const express=require("express")
const {authMiddleware,isAdmin}=require("../middlewares/authMiddleware.js");
const { createBrand,deleteBrand,updateBrand,getBrand, getallBrand } = require("../controllers/brandCtrl.js")
const router=express.Router()

router.post('/',authMiddleware,isAdmin,createBrand)

router.put('/:id',authMiddleware,isAdmin,updateBrand)
router.get('/:id',getBrand)
router.get('/',getallBrand)
router.delete('/:id',authMiddleware,isAdmin,deleteBrand)

module.exports=router