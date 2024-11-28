import { Request, Response } from 'express';
import { AppError } from '@errors/index';
import { errorResponseHandler } from '@errors/errorResponseHandler';
import { getUserByEmail, verifyPassword } from '@controllers/user'; // Assuming you have a function for verifying the password
import { generateToken } from '@utils/index';
import { Session } from '@utils/types';

export const loginUserHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body; // Get email and password from request body

  if (!email || !password) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', ['Email and password are required'])
    );
  }

  try {
    // Check if user exists with the given email
    const user = await getUserByEmail(email);

    if (!user) {
      return errorResponseHandler(
        res,
        new AppError(404, 'User not found', ['Invalid email or password'])
      );
    }

    // Verify the password (assuming you have a function for that)
    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return errorResponseHandler(
        res,
        new AppError(401, 'Unauthorized', ['Invalid email or password'])
      );
    }

    // Create session data (you can include other user information if needed)
    const session: Session = {
      id: user.id,
      email: user.email,
      userName: user.username,
    };

    // Generate JWT token
    const jwt = generateToken(session);

    // Set JWT token in cookie (to maintain session)
    res.cookie('jwt', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    // Respond with success, include the token if needed
    res.status(200).json({
      message: 'Login successful',
      token: jwt, // You can send the token back in the response or redirect
    });
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
