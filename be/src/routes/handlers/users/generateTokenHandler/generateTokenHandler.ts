import { Request, Response } from 'express';
import { AppError } from '@errors/index';
import { errorResponseHandler } from '@errors/errorResponseHandler';
import { getUserByEmail, setResetToken } from '@controllers/user'; // Assuming you have a function for verifying the password
import { generateToken } from '@utils/generateToken';
import { sendPasswordResetEmail } from '@services/index';

//generate a token and send it as email to the user
export const generateTokenHandler = async (req: Request, res: Response) => {
  const { email } = req.body; // Get email from request body

  if (!email) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', ['Email is required'])
    );
  }

  try {
    // Check if user exists with the given email
    const user = await getUserByEmail(email);

    if (!user) {
      return errorResponseHandler(
        res,
        new AppError(404, 'User not found', ['Invalid email'])
      );
    }
    const { id } = user;
    // Generate token
    const token = generateToken({ id });

    setResetToken(user.id, token);

    // Send the token to the user (e.g., via email)
    await sendPasswordResetEmail(user.email, token);
    // Respond with success
    res.status(200).json({
      message: 'Token generated and sent successfully',
    });
  } catch (error) {
    // Handle other errors
    return errorResponseHandler(res, error);
  }
};
