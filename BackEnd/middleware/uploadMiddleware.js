const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Different folders for different types of uploads
    const uploadPath = file.fieldname === 'receipt' ? 'uploads/receipts' : 'uploads/events';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const filetypes = /jpeg|jpg|png|gif|webp/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter
});

// Export different upload middlewares
module.exports = {
  // For event images
  eventImage: upload.single('image'),
  
  // For receipts
  receipt: upload.single('receipt'),
  
  // For multiple images if needed
  multipleImages: upload.array('images', 5),
  
  // Error handler
  handleUploadError: (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          message: 'File is too large. Maximum size is 5MB'
        });
      }
      return res.status(400).json({
        message: err.message
      });
    }
    
    if (err) {
      return res.status(400).json({
        message: err.message
      });
    }
    next();
  }
}; 