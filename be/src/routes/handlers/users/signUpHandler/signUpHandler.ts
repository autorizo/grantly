import { createUser, updateUserAvatarUrl } from '@controllers/user';
import { AppError, errorResponseHandler } from '@errors/index';
import {
  generateToken,
  optimizeProfileImage,
  responseHandler,
  uploadImageToStorage,
} from '@utils/index';
import { Request, Response } from 'express';
import multer from 'multer';
import { Session } from '@utils/types';

// Set up multer for handling file upload
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage }).single('image'); // 'image' is the field name in your form

export const signUpHandler = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    const userData = req.body;

    if (!userData) {
      return errorResponseHandler(
        res,
        new AppError(400, 'Validation Error', ['User data is required'])
      );
    }
    console.log(userData);
    const newUserPayload = {
      email: userData.email,
      username: userData.username,
      sub: userData.sub,
      photo: userData.photo,
      phone: userData.phone,
      phoneCountryCode: userData.phoneCountryCode,
      first_name: userData.first_name,
      last_name: userData.last_name,
    };

    const user = await createUser(newUserPayload);

    if (err) {
      return errorResponseHandler(
        res,
        new AppError(400, 'File upload error', [err.message])
      );
    }
    let photo = null;
    try {
      // Step 1: Optimize the image using the utility function
      if (req.file) {
        const optimizedImageBuffer = await optimizeProfileImage(
          req.file.buffer
        );

        // Step 2: Upload the image to Google Cloud Storage
        const { fileName, imageUrl } = await uploadImageToStorage(
          user.id,
          optimizedImageBuffer
        );

        photo = imageUrl;

        // Step 3: Update the user's avatar URL in the database
        await updateUserAvatarUrl(user.id, fileName);
      }
      const session: Session = {
        id: user.id,
        email: user.email,
        userName: user.username,
        photo: photo ?? undefined,
      };

      const jwt = generateToken(session);

      res.cookie('jwt', jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      responseHandler(res, 200, {
        message: 'User signed up successfully',
        jwt,
      });
    } catch (error: any) {
      return errorResponseHandler(
        res,
        new AppError(500, 'Image update error', [error.message])
      );
    }
  });
};
