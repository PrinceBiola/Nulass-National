const fs = require('fs').promises;
const path = require('path');

// Base upload directory
const UPLOAD_DIR = path.join(__dirname, '../../uploads');

// Sub directories
const DIRS = {
  events: path.join(UPLOAD_DIR, 'events'),
  receipts: path.join(UPLOAD_DIR, 'receipts')
};

// Create directories if they don't exist
const initializeUploadDirs = async () => {
  try {
    // Create base upload directory
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    
    // Create sub directories
    await Promise.all(
      Object.values(DIRS).map(dir => 
        fs.mkdir(dir, { recursive: true })
      )
    );

    // Set directory permissions (755 - rwxr-xr-x)
    await Promise.all(
      [UPLOAD_DIR, ...Object.values(DIRS)].map(dir =>
        fs.chmod(dir, 0o755)
      )
    );

    console.log('Upload directories initialized successfully');
  } catch (error) {
    console.error('Error initializing upload directories:', error);
    throw error;
  }
};

// Clean up old files (files older than 30 days)
const cleanupOldFiles = async () => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    for (const dir of Object.values(DIRS)) {
      const files = await fs.readdir(dir);
      
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = await fs.stat(filePath);
        
        if (stats.mtime < thirtyDaysAgo) {
          await fs.unlink(filePath);
          console.log(`Deleted old file: ${filePath}`);
        }
      }
    }
  } catch (error) {
    console.error('Error cleaning up old files:', error);
  }
};

// Delete a single file
const deleteFile = async (filePath) => {
  try {
    await fs.unlink(path.join(UPLOAD_DIR, filePath));
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

module.exports = {
  UPLOAD_DIR,
  DIRS,
  initializeUploadDirs,
  cleanupOldFiles,
  deleteFile
}; 