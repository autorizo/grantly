import { updateUserData } from '@controllers/user';
import { AppError, errorResponseHandler } from '@errors/index';
import dayjs from 'dayjs';
import { Request, Response } from 'express';

export const updateUserHandler = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { token, ...userData } = req.body;

  if (!userId) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', ['User ID is required'])
    );
  }

  if (!userData) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', ['User data is required'])
    );
  }

  try {
    const uploadedUserData = {
      ...userData,
      updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'), // Update timestamp
    };
    await updateUserData(userId, uploadedUserData);

    res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    // Handle other errors
    return errorResponseHandler(res, error);
  }
};
