import { Request, Response } from 'express';
import { getAllTickets } from '@controllers/index';
import { AppError } from '@errors/index';
import { errorResponseHandler } from '@errors/errorResponseHandler';
import { responseHandler } from '@utils/index';

// Implement the handler
export const getAllTicketsHandler = async (req: Request, res: Response) => {
  try {
    const tickets = await getAllTickets();
    responseHandler(res, 200, tickets);
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
