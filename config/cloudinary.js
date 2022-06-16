const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "devsalem",
  api_key: process.env.CLOUDINARY_API_PUBLIC_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: "YOU" },
});

module.exports = { storage };
