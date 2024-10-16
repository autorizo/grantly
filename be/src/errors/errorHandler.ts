// errorMiddleware.ts
import { IncomingMessage, ServerResponse } from 'http';
import { AppError } from './AppError';
import { ResponseBody } from './errorHandler.types';

const errorMiddleware = (
  err: Error,
  req: IncomingMessage,
  res: ServerResponse
) => {
  let statusCode = 500; // Default to Internal Server Error
  let responseBody: ResponseBody = {
    message: 'An unexpected error occurred',
    errors: [],
    warnings: [],
  };

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    responseBody = {
      message: err.message,
      errors: err.errors,
      warnings: err.warnings,
    };
  }

  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(responseBody));
};

export default errorMiddleware;
