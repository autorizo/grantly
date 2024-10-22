import { updatePermissionState } from '@controllers/index'; // This updates the permission state
import { insertNotification } from '@controllers/notificationsController'; // New function to insert notifications
import { AppError, errorResponseHandler } from '@errors/index';
import { responseHandler } from '@utils/index';
import { Request, Response } from 'express';

export const updatePermissionHandler = async (req: Request, res: Response) => {
  const { userId, permissionId, state } = req.body ?? {};

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
  const validStates = ['active', 'inactive'];
  if (!validStates.includes(state)) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', [
        'State must be one of the following: active, inactive',
      ])
    );
  }

  try {
    // Call the updatePermissionState function to insert or update the log
    const permissionLog = await updatePermissionState(
      userId,
      permissionId,
      state
    );

    // Insert a notification about the permission state change
    await insertNotification(
      null, // Pass provider ID if applicable, otherwise keep null
      permissionId, // Use the ID of the updated or inserted permission log
      userId,
      state === 'active' ? 'active_permission' : 'inactive_permission', // Determine the action based on the state
      null // Justification can be null or provided if applicable
    );

    // Send response with the permission log
    responseHandler(res, 200, permissionLog);
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
