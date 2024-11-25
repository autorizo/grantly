import { Request, Response } from 'express';
import { AppError } from '@errors/index';
import { errorResponseHandler } from '@errors/errorResponseHandler';
import { getUserByToken, updateUserPassword } from '@controllers/user'; // Assuming you have a function for verifying the password
import { verifyRestoreToken } from '@utils/index';

export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { token, password } = req.body; // Get token and password from request body

  if (!token || !password) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', ['Token and password are required'])
    );
  }

  try {
    // Verify the token (assuming you have a function for that)
    const user = await getUserByToken(token);

    if (!user) {
      return errorResponseHandler(
        res,
        new AppError(404, 'User not found', ['Invalid token'])
      );
    }
    // verify the token
    const isTokenValid = await verifyRestoreToken(token, user.email);

    if (!isTokenValid) {
      return errorResponseHandler(
        res,
        new AppError(401, 'Unauthorized', ['Invalid token'])
      );
    }

    // Update user password (assuming you have a function for that)
    await updateUserPassword(user.id, password);

    // Respond with success
    res.status(200).json({
      message: 'Password reset successful',
    });
  } catch (error) {
    // Handle other errors
    return errorResponseHandler(res, error);
  }
};
