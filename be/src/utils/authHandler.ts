import { NextFunction, Request, Response } from 'express';
import { verifyToken } from './verifyToken'; // Your token verification logic
import { AppError } from '@errors/AppError';
import { errorResponseHandler } from '@errors/errorResponseHandler';

// Middleware to check Bearer token and authenticate user
export const authHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Add explicit return type as void
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    return errorResponseHandler(
      res,
      new AppError(401, 'Unauthorized', ['Authorization header is required'])
    );
  }

  const bearer = bearerHeader.split(' ');

  // Check if the token is in the expected format
  if (bearer.length !== 2 || bearer[0] !== 'Bearer') {
    return errorResponseHandler(
      res,
      new AppError(401, 'Unauthorized', ['Invalid token format'])
    );
  }

  const bearerToken = bearer[1];

  try {
    // Verify the token and get the user information (use your verifyToken function here)
    const user = await verifyToken(bearerToken);
    if (!user) {
      return errorResponseHandler(
        res,
        new AppError(403, 'Forbidden', [
          'Invalid or expired token auth handler',
        ])
      );
    }

    // Attach the user information to the request object
    req.body.user = user; // Or attach user info if you have verified it

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors during token verification
    return errorResponseHandler(res, error);
  }
};
