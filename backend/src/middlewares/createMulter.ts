import path from 'path';

import multer from 'multer';


export default function createMulter(folder: string, filename: string, fileSize: number = 5000000): multer.Multer {
  const storageEngine = multer.diskStorage({
    destination: `/Users/martelka/Documents/Study/fullstack/projects/videos/backend/content/${folder}`,
    filename: (req, file, callback) => {
      callback(null, `${filename}_${Date.now()}${path.extname(file.originalname)}`);
    },
  });
  
  const checkFileType = function (file: Express.Multer.File, callback: multer.FileFilterCallback) {
    const fileTypes = /jpeg|jpg|png/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType && extName) {
      return callback(null, true);
    } else {
      console.log('ext error')
      callback(new Error("Error: You can Only Upload Images!"));
    }
  };
  
  const upload = multer({
    storage: storageEngine,
    limits: { fileSize },
    fileFilter: (req, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
      checkFileType(file, callback);
    }
  });

  return upload;
}