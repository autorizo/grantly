import { AppError, errorResponseHandler } from '@errors/index';
import { Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { Storage } from '@google-cloud/storage';
import { updateUserAvatarUrl } from '@controllers/user';

// Set up Google Cloud Storage
const storage = new Storage({
  keyFilename: path.join(
    process.cwd(),
    './secrets/autorizo-441221-543456ed3158.json'
  ), // Root path
});

const bucket = storage.bucket('autorizo-avatar'); // Replace with your bucket name

// Set up multer for handling file upload
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage }).single('image'); // 'avatar' is the field name in your form

export const updateUserImageHandler = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (!userId) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', ['User ID is required'])
    );
  }

  // Use multer to handle file upload
  upload(req, res, async (err) => {
    if (err) {
      return errorResponseHandler(
        res,
        new AppError(400, 'File upload error', [err.message])
      );
    }

    if (!req.file) {
      return errorResponseHandler(res, new AppError(400, 'Image is required'));
    }

    try {
      // Optimize the image with sharp
      const optimizedImageBuffer = await sharp(req.file.buffer)
        .resize(500, 500, { fit: 'inside' }) // Resize the image (adjust if needed)
        .toFormat('jpeg')
        .jpeg({ quality: 80 }) // Set image quality (adjust as needed)
        .toBuffer();

      // Upload the optimized image to Google Cloud Storage
      const fileName = `${userId}-${Date.now()}.jpeg`; // Unique file name to avoid collisions
      const file = bucket.file(fileName);
      const blobStream = file.createWriteStream({
        resumable: false,
        contentType: 'image/jpeg',
      });

      blobStream.on('finish', async () => {
        // Save the image URL in your database (this is a placeholder)
        await updateUserAvatarUrl(userId, fileName);
        const imageUrl = await file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 1000 * 60 * 60, // 1 hour
        });
        res.status(200).json({
          message: 'User image updated successfully',
          imageUrl, // Return the URL of the uploaded image
        });
      });

      blobStream.on('error', (err) => {
        console.error(err);
        return errorResponseHandler(
          res,
          new AppError(500, 'Storage error', [err.message])
        );
      });

      blobStream.end(optimizedImageBuffer);
    } catch (error: any) {
      return errorResponseHandler(
        res,
        new AppError(500, 'Image optimization error', [error.message])
      );
    }
  });
};
