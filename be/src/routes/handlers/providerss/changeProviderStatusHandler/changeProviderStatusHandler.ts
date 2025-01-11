import { Request, Response } from 'express';
import { AppError } from '@errors/index';
import { errorResponseHandler } from '@errors/errorResponseHandler';
import { responseHandler } from '@utils/index';
import { changeProviderStatus, insertNotification } from '@controllers/index';

export const changeProviderStatusHandler = async (
  req: Request,
  res: Response
) => {
  const { providerId } = req.params;
  const { justification } = req.body;
  const { id } = req.body.user;

  if (!providerId) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', ['Provider ID is required'])
    );
  }

  try {
    const userPermissions = await changeProviderStatus(providerId);
    const newAction =
      userPermissions.status === 'enabled'
        ? 'unblock_provider'
        : 'block_provider';

    await insertNotification(providerId, null, id, newAction, justification);
    responseHandler(res, 200, userPermissions);
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
