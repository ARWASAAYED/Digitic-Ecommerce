const User = require("../models/userModel"); 
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if (req?.headers?.authorization?.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; 

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user= await User.findById(decoded?.id)
            req.user=user

            next(); 
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized, token expired. Please login again.");
        }
    } else {
        res.status(401);
        throw new Error("There is no token attached to the header.");
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;

    const adminUser = await User.findOne({ email });

    if (adminUser.role !== "admin") {
        res.status(403);
        throw new Error("You are not an admin");
    } else {
        next();
    }
});

module.exports = { authMiddleware , isAdmin };
