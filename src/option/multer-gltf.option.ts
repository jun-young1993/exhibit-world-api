import { extname } from 'path';
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { HttpException, HttpStatus } from "@nestjs/common";
import { diskStorage } from "multer";
import { existsSync, mkdirSync } from "fs";
import {v4 as uuid} from 'uuid';

export const MulterGltfOptions = {
  dest: process.env.GLTF_MULTER_DEST,
  fileFilter(req, file, cb) {

    if (file.mimetype.match(/\/(octet-stream)$/)) {
      // Allow storage of file
      cb(null, true);
    } else {
      // Reject file
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)} mimetype: ${file.mimetype}`,
          HttpStatus.BAD_REQUEST),
        false
      );
    }
  },
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = process.env.GLTF_MULTER_DEST;
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath,{
          recursive: true
        });
      }
      cb(null, uploadPath);
    },
    filename(req, file, cb) {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    }
  }),
} as MulterOptions