// backend/middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Define where to store the files (locally)
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Files will be stored in the root 'uploads' folder
    cb(null, 'uploads/'); 
  },
  filename(req, file, cb) {
    // Generate unique name: fieldname-timestamp.ext
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb({ message: 'Only images are allowed' }, false);
  }
};

// --- Single Image Upload ---
const uploadSingle = multer({ storage, fileFilter });

// --- Multiple Image Upload (for 5-10 images) ---
const uploadMultiple = multer({ storage, fileFilter }).array('images', 10); // 'images' is the field name, 10 is max count

module.exports = { uploadSingle, uploadMultiple };