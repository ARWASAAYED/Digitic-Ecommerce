const express = require("express");
const {createProduct, getaProduct,getAllProduct, updateProduct,deleteProduct, addToWishlist,rating, uploadImages, deleteImages}=require("../controllers/productCtrl")
const {isAdmin,authMiddleware}=require("../middlewares/authMiddleware.js");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage.js");
const router=express.Router();


router.post("/",authMiddleware,isAdmin,createProduct)

router.put(
    "/upload/:id",
    authMiddleware,
    isAdmin,
    uploadPhoto.array("images", 10), 
    productImgResize, 
    uploadImages, 

  );
  

router.get("/:id",getaProduct)

router.put("/wishlist",authMiddleware,addToWishlist)

router.put("/rating",authMiddleware,rating)



router.put("/:id",authMiddleware,isAdmin,updateProduct)
router.delete(
  "/delete-img/:id",
  authMiddleware,
  isAdmin,
  deleteImages

);
router.delete("/:id",authMiddleware,isAdmin,deleteProduct)


router.get("/",getAllProduct)


module.exports=router
