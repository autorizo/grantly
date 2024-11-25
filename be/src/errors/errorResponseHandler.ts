// errorUtils.ts
import { ServerResponse } from 'http';
import { AppError } from '@errors/index'; // Adjust the import as necessary

export const errorResponseHandler = (res: ServerResponse, error: unknown) => {
  let appError: AppError;

  if (error instanceof AppError) {
    appError = error;
  } else {
    const message =
      error instanceof Error ? error.message : 'An unknown error occurred';
    appError = new AppError(500, message);
  }

  res.writeHead(appError.statusCode, { 'Content-Type': 'application/json' });

  res.end(
    JSON.stringify({
      message: appError.message,
      errors: appError.errors,
      warnings: appError.warnings,
    })
  );
};
