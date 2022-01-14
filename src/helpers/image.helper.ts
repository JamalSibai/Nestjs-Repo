import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';

export const ImageUploader = {
  limits: {
    files: 1,
    fileSize: 5 * 10 * 10 * 10 * 10 * 10 * 10 * 10, // 50 mb in bytes
  },
  storage: diskStorage({
    destination: './uploads/profileimages',

    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      console.log('in helper');
      cb(null, `${filename}${extension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext: string = path.parse(file.originalname).ext;
    let types = ['.jpg', '.jpeg', '.png', '.gif'];
    if (!types.includes(ext)) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  },
};
