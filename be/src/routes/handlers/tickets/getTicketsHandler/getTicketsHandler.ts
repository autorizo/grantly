import { Request, Response } from 'express';
import { getUserTickets } from '@controllers/index';
import { AppError } from '@errors/index';
import { errorResponseHandler } from '@errors/errorResponseHandler';
import { responseHandler } from '@utils/index';

// Implement the handler
export const getTicketsHandler = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) {
    return errorResponseHandler(
      res,
      new AppError(400, 'Validation Error', ['User ID is required'])
    );
  }

  try {
    const userTickets = await getUserTickets(userId);
    responseHandler(res, 200, userTickets);
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
