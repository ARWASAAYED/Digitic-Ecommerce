const express = require("express");
const {createUser, updateUser, handleRefreshToken,logout,updatePassword,forgotPasswordToken,resetPassword, loginAdmin, getWishlist, SaveAddress, UserCart, getUserCart, emptyCart, applyCoupon,createOrder, getOrders,updateOrderStatus }=require('../controllers/userCtrl')
const {loginUserCtrl}=require('../controllers/userCtrl')

const {getallUser}=require('../controllers/userCtrl')
const {getaUser}=require('../controllers/userCtrl')
const {deleteaUser,blockUser,unblockUser}=require('../controllers/userCtrl')
const {authMiddleware,isAdmin}=require("../middlewares/authMiddleware.js");
const { protect } = require("../middlewares/protectMiddleware");
const { create } = require("../models/userModel.js");


const router=express.Router();

router.post("/register",createUser)
router.post("/login",loginUserCtrl)
router.post("/admin-login",loginAdmin)
router.post("/cart",protect ,UserCart)
router.post("/apply-coupon", authMiddleware,applyCoupon)
router.post("/cash-order", authMiddleware,createOrder)
router.post("/forgot-password-token",forgotPasswordToken)
router.put("/reset-password/:token",resetPassword)

router.get("/all:users",getallUser)
router.get("/get-orders",authMiddleware,getOrders)
router.get("/refresh",handleRefreshToken)
router.get("/logout", logout)
router.get("/wishlist", authMiddleware,getWishlist)
router.get("/cart", authMiddleware,getUserCart)
router.get("/:id", authMiddleware,isAdmin,getaUser)

router.delete("/empty-cart",authMiddleware, emptyCart)


router.delete("/:id", deleteaUser)

router.put("/order/update-order/:id",authMiddleware,isAdmin,updateOrderStatus)
router.put('/password',authMiddleware,updatePassword )
router.put("/edit-users",authMiddleware, updateUser)
router.put("/save-address",authMiddleware, SaveAddress)
router.put("/block-user/:id",authMiddleware,isAdmin, blockUser)
router.put("/unblock-user/:id",authMiddleware,isAdmin, unblockUser)

module.exports=router