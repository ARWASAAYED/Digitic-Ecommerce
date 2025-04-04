const multer = require("multer");
const sharp = require("sharp"); 
const path = require("path");
const fs = require("fs");
const { cloudinaryUploadImg } = require("../utils/cloudinary");

// 🔹 Use dynamic storage based on request type
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "products"; // Default folder

    if (req.baseUrl.includes("blog")) {
      uploadPath = "blogs"; // If request is for blogs, use blog folder
    }

    cb(null, path.join(__dirname, `../public/images/${uploadPath}`));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, 
});

// 🔹 Generic function to resize images and delete old ones
const resizeImage = async (req, folder) => {
  if (!req.files) return;

  await Promise.all(
    req.files.map(async (file) => {
      const newFilename = `${folder}-${Date.now()}-${Math.round(Math.random() * 1e9)}.jpeg`;
      const newPath = path.join(__dirname, `../public/images/${folder}`, newFilename);

      // Resize & save to new location
      await sharp(file.path)
        .resize(300, 300)
        .jpeg({ quality: 90 })
        .toFile(newPath);

      // Add a small delay to ensure OS releases the file
      setTimeout(() => {
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error(`❌ Error deleting file: ${file.path}`, err);
          } else {
            console.log(`🗑 Deleted file: ${file.path}`);
          }
        });
      }, 100); // 100ms delay to prevent file lock issues

      // Update file path for further processing
      file.path = newPath;
    })
  );
};


const productImgResize = async (req, res, next) => {
  await resizeImage(req, "products");
  next();
};

const blogImgResize = async (req, res, next) => {
  await resizeImage(req, "blogs");
  next();
};

;

module.exports = { uploadPhoto, blogImgResize, productImgResize };

