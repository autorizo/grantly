import { Request, Response } from 'express';
import { AppError } from '@errors/index';
import { errorResponseHandler } from '@errors/errorResponseHandler';
import { getUserById } from '@controllers/user';

export const getUserByIdHandler = async (req: Request, res: Response) => {
  const { userId } = req.params; // Get user id from request params

  if (!userId) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', ['User ID is required'])
    );
  }

  try {
    // Get user by id (assuming you have a function for that)
    const user = await getUserById(userId);

    if (!user) {
      return errorResponseHandler(
        res,
        new AppError(404, 'User not found', ['User not found'])
      );
    }

    // Respond with user data
    res.status(200).json({
      user,
    });
  } catch (error) {
    // Handle other errors
    return errorResponseHandler(res, error);
  }
};
