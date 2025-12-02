const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define upload folder
const uploadPath = path.join(__dirname, "../public/uploads");

// Create folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// Export upload middleware
const upload = multer({ storage });

module.exports = upload;
