const express=require("express")
const {authMiddleware,isAdmin}=require("../middlewares/authMiddleware.js");
const { createCategory,updateCategory,deleteCategory,getCategory,getallCategory } = require("../controllers/prodcategoryCtrl.js")
const router=express.Router()

router.post('/',authMiddleware,isAdmin,createCategory)

router.put('/:id',authMiddleware,isAdmin,updateCategory)
router.get('/:id',getCategory)
router.get('/',getallCategory)
router.delete('/:id',authMiddleware,isAdmin,deleteCategory)

module.exports=router