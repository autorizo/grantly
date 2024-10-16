import { logPermissionState } from '@controllers/index';
import { AppError, errorResponseHandler } from '@errors/index';
import { responseHandler } from '@utils/index';
import { Request, Response } from 'express';

export const insertPermissionLog = async (req: Request, res: Response) => {
  const { userId, permissionId, state, justification } = req.body ?? {};

  // Validate the input
  if (!userId || !permissionId || !state) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', [
        'User ID, Permission ID, and State are required',
      ])
    );
  }

  // Optional: Validate that the state is one of the allowed values
  const validStates = ['active', 'blocked', 'disabled'];
  if (!validStates.includes(state)) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', [
        'State must be one of the following: active, blocked, disabled',
      ])
    );
  }

  try {
    // Call the logPermissionState function to insert the log
    const permissionLog = await logPermissionState(userId, permissionId, state, justification);
    responseHandler(res, 200, permissionLog);
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
