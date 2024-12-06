import { AppError, errorResponseHandler } from '@errors/index';
import { Request, Response } from 'express';
import multer from 'multer';
import { updateUserAvatarUrl } from '@controllers/user';
import { optimizeProfileImage } from '@utils/optimizeProfileImage';
import { uploadImageToStorage } from '@utils/uploadImageToStorage';

// Set up multer for handling file upload
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage }).single('image'); // 'image' is the field name in your form

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
      // Step 1: Optimize the image using the utility function
      const optimizedImageBuffer = await optimizeProfileImage(req.file.buffer);

      // Step 2: Upload the image to Google Cloud Storage
      const { fileName, imageUrl } = await uploadImageToStorage(
        userId,
        optimizedImageBuffer
      );

      // Step 3: Update the user's avatar URL in the database
      await updateUserAvatarUrl(userId, fileName);

      // Respond with the uploaded image URL
      res.status(200).json({
        message: 'User image updated successfully',
        imageUrl, // Return the URL of the uploaded image
      });
    } catch (error: any) {
      return errorResponseHandler(
        res,
        new AppError(500, 'Image update error', [error.message])
      );
    }
  });
};
