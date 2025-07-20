import { Request, Response } from 'express';
import { uploadToCloudinary } from './upload.services';

import multer from 'multer';
import fs from 'fs';
import sendResponse from '@/utils/sendResponse';

const upload = multer({ dest: 'uploads/' });

export const uploadSingleImage = (req: Request, res: Response) => {
  upload.single('image')(req, res, async err => {
    if (err) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: 'file upload failed',
      });
    }
    if (!req.file) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: 'No file upload',
      });
    }

    try {
      const result = await uploadToCloudinary(req.file.path);
      // Delete the local file after successful upload
      fs.unlink(req.file.path, unlinkErr => {
        if (unlinkErr) {
          // Handle the error appropriately, e.g., log to a file or a dedicated error handling service
        }
      });
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Image uploaded successfully',
        data: {
          url: result.secure_url,
        },
      });
    } catch (error) {
      // Ensure local file is deleted even if Cloudinary upload fails
      fs.unlink(req.file.path, unlinkErr => {
        if (unlinkErr) {
          // Handle the error appropriately, e.g., log to a file or a dedicated error handling service
        }
      });
      sendResponse(res, {
        statusCode: 500,
        success: false,
        message: 'Image upload failed',
        data: error,
      });
    }
  });
};
