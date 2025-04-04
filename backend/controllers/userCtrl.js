const User = require("../models/userModel");
const mongoose = require("mongoose");



const asyncHandler=require('express-async-handler')
const {generateToken}=require('../config/jwToken')
const {generateRefreshToken}=require('../config/refreshtoken')
const sendEmail=require('../controllers/emailCtrl')

const validateMongodb = require("../utils/validateMongodb");

const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");
const Coupon = require("../models/couponModel");

const jwt=require('jsonwebtoken')
const crypto=require('crypto')




//handle refresh token
const handleRefreshToken=asyncHandler(async(req,res)=>{
    const cookie=req.cookies;
    console.log(cookie)
    if(!cookie?.refreshToken) throw new Error("no Refresh Token in Cookies")
    const refreshToken=cookie.refreshToken;
    const user =await User.findOne({refreshToken})
    if(!user) throw new Error("No Refresh token present in db or not matched ")
    jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded)=>{
        if(err||user.id!==decoded.id)
            throw new Error("there is somthing wrong with refresh token")
    })
    const accessToken=generateRefreshToken(user?._id)
    res.json({accessToken})
   
})

//logout functionality

const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) throw new Error("No refresh token in cookies");

    const refreshToken = cookies.refreshToken;
    const user = await User.findOne({ refreshToken });

    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // No Content
    }

    // Update user to remove refresh token
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });

    // Clear refresh token cookie
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });

    res.sendStatus(204); // No Content
});


// create user
const createUser = asyncHandler( async (req, res) => {
    try {
        const email = req.body.email;
        const findUser = await User.findOne({ email:email });

        if (!findUser) {
            // Create a new user
            const newUser = await User.create(req.body);
            return res.json(newUser);
        } else {
            // User already exists
            throw new Error("User Already Exists")
        
        }
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Server Error", success: false });
    }
});
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken=await generateRefreshToken(findUser?._id)
        const updateuser=await User.findByIdAndUpdate(findUser?._id,{
            refreshToken:refreshToken,
        },{new:true})
res.cookie('refreshToken',refreshToken,
    {   httpOnly:true,
        maxAge:72*60*60*1000,
        })
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile:findUser?.mobile,
            token: generateToken(findUser?._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid Credentials");
    }
});

const loginAdmin= asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const findAdmin = await User.findOne({ email });

    if(findAdmin.role!=="admin") throw new Error("Not Authorized to login as Admin")

    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken=await generateRefreshToken(findAdmin?._id)
        const updateuser=await User.findByIdAndUpdate(findAdmin?._id,{
            refreshToken:refreshToken,
        },{new:true})
res.cookie('refreshToken',refreshToken,
    {   httpOnly:true,
        maxAge:72*60*60*1000,
        })
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile:findAdmin?.mobile,
            token: generateToken(findAdmin?._id)
        });
    } else {
        res.status(401);
        throw new Error("Invalid Credentials");
    }
});

const updateUser = asyncHandler(async (req, res) => {
    console.log("Updating user:", req.user?._id);
    
    const { _id } = req.user;
    validateMongodb(_id)
    try {
        // Check if the user exists
        const existingUser = await User.findById(_id);
        if (!existingUser) {
            res.status(404);
            throw new Error("User not found");
        }

        // Check if the new email already exists (excluding current user)
        if (req.body.email) {
            const emailExists = await User.findOne({ email: req.body.email, _id: { $ne: _id } });
            if (emailExists) {
                res.status(400);
                throw new Error("Email already in use");
            }
        }

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                firstname: req.body.firstname || existingUser.firstname,
                lastname: req.body.lastname || existingUser.lastname,
                email: req.body.email || existingUser.email,
                mobile: req.body.mobile || existingUser.mobile,
            },
            { new: true, runValidators: true }
        );

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const blockUser= asyncHandler(async(req,res)=>{
   const{id}=req.params;
   validateMongodb(id)
   try{
const blockUser=await User.findByIdAndUpdate(
    id,
    {
        isBlocked:true,
    },
    {
        new:true,
    }
)
res.json({
    message:"User Blocked",
    user: blockUser
})
   }
   catch (error){
throw new Error(error)
   }
})

const unblockUser= asyncHandler(async(req,res)=>{
    const{id}=req.params;
    validateMongodb(id)
   try{
const unblockUser=await User.findByIdAndUpdate(
    id,
    {
        isBlocked:false,
    },
    {
        new:true,
    }
)
res.json({
    message:"User unBlocked",
    user:unblockUser

})
   }
   catch (error){
throw new Error(error)
   }
})

module.exports = { updateUser };

//save address

const SaveAddress = async (req, res) => {
    const { id } = req.user; 
    validateMongoDbId(id);
    try {
       
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { address: req?.body?.address },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Address updated successfully",  updatedUser });
    } catch (error) {
        console.error("Error saving address:", error);
        res.status(500).json({ message: "Error saving address", error });
    }
};

// get all user 
const getallUser=asyncHandler(async(req,res)=>{
    try{
        const getUsers=await User.find();
        res.json(getUsers)
    }catch(error){
        throw new Error(error)

    }
})
// get a single user
const getaUser=asyncHandler(async(req,res)=>{
    console.log(req.params)
    const {id}=req.params
    validateMongodb(id)
    try{
        const getaUser=await User.findById(id)
        res.json({
            getaUser,
        })
       
    }catch(error){
        throw new Error(error)

    }
        
   
})

// delete single user
const deleteaUser=asyncHandler(async(req,res)=>{
    console.log(req.params)
    const {id}=req.params
    validateMongodb(id)
    try{
        const deleteaUser=await User.findByIdAndDelete(id)
        res.json({
            deleteaUser,
        })
       
    }catch(error){
        throw new Error(error)

    }
        
   
})


const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user; 
    const { password } = req.body; 

    validateMongoDbId(_id); 

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (password) {
            user.password = password; 
          const updatedPassword=  await user.save(); 
           return  res.json(updatedPassword);
        } else {
            return res.json(user)
        }
    } catch (error) {
        throw new Error(error);
    }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    
    try{
        const token=await user.createPasswordResetToken();
        await user.save()
        const resetURL=`Hi, please follow this link to reset Your Password, this link is valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}>Click Here</>`;
        const data={
            to:email,
            test:"Hey User",
            subject:"Forgot Password Link",
            htm:resetURL,
        }
        sendEmail(data)
        res.json(token);
    }
    catch (error) {
        throw new Error(error);
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.params;

        // Hash the token received from the request
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // Find the user with the matching reset token and check if it's still valid
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }, // ✅ Corrected timestamp issue
        });

        if (!user) {
            return res.status(400).json({ error: "Token Expired, Please try again later" });
        }

        // Update the user's password and clear reset fields
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save();

        res.json(user);
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const getWishlist = async (req, res) => {
    const { id } = req.user; 
    try {
       
        const user = await User.findById(id).populate("wishlist");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ message: "Error fetching wishlist", error });
    }
};
const validateMongoDbId = (id) => {
    const regex = /^[0-9a-fA-F]{24}$/;
    if (!regex.test(id)) {
      throw new Error("Invalid MongoDB ID");
    }
  };

//  Add Items to Cart
const UserCart = asyncHandler(async (req, res) => {
    const { cart } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        let products = [];

        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const alreadyExistCart = await Cart.findOne({ orderby: user._id });
        if (alreadyExistCart) {
            await alreadyExistCart.deleteOne();
        }

       
        for (let i = 0; i < cart.length; i++) {
            let object = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;

            
            let getPrice = await Product.findById(cart[i]._id).select("price").exec();

            if (!getPrice) {
                return res.status(404).json({ message: `Product with ID ${cart[i]._id} not found` });
            }

            object.price = getPrice.price;
            products.push(object);
        }

     
        let cartTotal = products.reduce((total, item) => total + item.price * item.count, 0);

      
        const newCart = await Cart.create({
            orderby: user._id,
            products: products,
            cartTotal: cartTotal,
        });

        return res.status(200).json(newCart); 

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
  });
  
  const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;  // User ID from the token
    validateMongoDbId(_id);

    try {
      
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

    
        let userCart = await Cart.findOne({ orderby: _id }).populate("products.product")

   
        if (!userCart) {
            userCart = await new Cart({
                orderby: _id,
                products: [],  
                cartTotal: 0, 
            }).save();
        }

        return res.status(200).json(userCart);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
  });
  

  const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user; 
    validateMongoDbId(_id);

    try {
        
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

       
        const cart = await Cart.findOne({ orderby: _id });
        if (!cart) {
            return res.status(200).json({ message: "Cart is already empty" });
        }

     
        await Cart.deleteOne({ orderby: _id });

        
        user.cart = [];
        await user.save();

        return res.status(200).json({ message: "Cart emptied successfully" });
    } catch (error) {
        console.error("Error emptying cart:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
  });

  const applyCoupon = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { coupon } = req.body; 

    validateMongoDbId(_id);

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

     
        const validCoupon = await Coupon.findOne({
            name: { $regex: new RegExp(`^${coupon}$`, "i") }
        });

        console.log(" Coupon searched:", coupon);
        console.log(" Coupon found in DB:", validCoupon);

        const currentDate = new Date();
        if (!validCoupon || validCoupon.expiry < currentDate) {
            return res.status(400).json({ message: "Invalid or expired coupon code" });
        }

        return res.status(200).json({
            message: "Coupon applied successfully",
            discount: validCoupon.discount
        });

    } catch (error) {
        console.error(" Error applying coupon:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});



const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user; 
    const { COD, couponApplied } = req.body;
    validateMongoDbId(_id);

    if (!_id) {
        return res.status(401).json({ message: "Unauthorized: User ID is missing" });
    }

    try {
        
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!COD) {
            return res.status(400).json({ message: "Create cash order failed" });
        }

        const userCart = await Cart.findOne({ orderby: user._id });

       
        if (!userCart) {
            return res.status(400).json({ message: "Cart is empty, cannot place order" });
        }

        let finalAmount = 0;
        if (couponApplied && userCart.totalafterdiscount) {
            finalAmount = userCart.totalafterdiscount ;
        } else {
            finalAmount = userCart.cartTotal * 100;
        }

        const newOrder = await Order.create({
            products: userCart.products,
            paymentIntent: {
                id: "COD",
                amount: finalAmount,
                currency: "usd",
                status: "Cash On Delivery",
                created: Date.now(),
                payment_method_types: ["cash"],
            },
            orderby: user._id,
            
            paymentMethod: "Cash On Delivery",
          
        });

        const updates = userCart.products.map((item) => ({
            updateOne: {
                filter: { _id: item.product._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } },
            },
        }));

        if (updates.length > 0) {
            await Product.bulkWrite(updates);
        }

      
        await Cart.findOneAndDelete({ orderby: user._id });

        return res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        });

    } catch (error) {
        console.error(" Error creating order:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user; 
    validateMongoDbId(_id);

    try {
        
        const orders = await Order.find({ orderby: _id })
            .populate("products.product") 
            .sort({ createdAt: -1 }); 

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        return res.status(200).json({ message: "Orders retrieved successfully", orders });
    } catch (error) {
        console.error("Error retrieving orders:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const { status } = req.body; 
    validateMongoDbId(id); 

    try {
        
        const updatedOrderStatus = await Order.findByIdAndUpdate(
            id,
             {orderStatus: status ,
            paymentIntent: {    
                status: status,
            },
            },
            { new: true }
        );

  
        if (!updatedOrderStatus) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ 
            message: "Order status updated successfully", 
            order: updatedOrderStatus 
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

  
  
  
module.exports = { createUser,loginUserCtrl,getallUser, getaUser, deleteaUser,updateUser, unblockUser, blockUser, handleRefreshToken,logout,updatePassword,forgotPasswordToken,resetPassword,loginAdmin,getWishlist,SaveAddress,UserCart,getUserCart,emptyCart,applyCoupon,createOrder,getOrders,updateOrderStatus};
