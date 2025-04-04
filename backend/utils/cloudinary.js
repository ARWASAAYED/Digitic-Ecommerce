const cloudinary = require("cloudinary").v2;
const fs = require("fs"); 
require("dotenv").config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});


const cloudinaryUploadImg = (fileToUpload) => {
  return new Promise((resolve, reject) => {
      console.log(" Uploading image to Cloudinary:", fileToUpload);

      cloudinary.uploader.upload(fileToUpload, { folder: "products" }, (error, result) => {
          if (error) {
              console.error(" Error uploading image to Cloudinary:", error);
              return reject(error);
          }

          resolve({
              url: result.secure_url, // Image URL
              assetId: result.asset_id, // Asset ID
              publicId: result.public_id, // Public ID
          });
      });
  });
};


const cloudinaryDeleteImg = (fileToDelete) => {
  return new Promise((resolve, reject) => {
      const fullPublicId = `products/${fileToDelete}`; // 👈 Include "products" folder
      console.log("🗑 Attempting to delete from Cloudinary:", fullPublicId);

      cloudinary.uploader.destroy(fullPublicId, (error, result) => {
          if (error) {
              console.error("❌ Cloudinary API Error:", error);
              return reject(error);
          }

          console.log("✅ Cloudinary Delete Response:", result);

          if (result.result === "not found") {
              return reject(new Error(`⚠️ Image not found in Cloudinary: ${fullPublicId}`));
          }

          if (result.result !== "ok") {
              return reject(new Error("❌ Failed to delete image from Cloudinary"));
          }

          resolve(result);
      });
  });
};



module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
