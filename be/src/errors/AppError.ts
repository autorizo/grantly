// AppError.ts
export class AppError extends Error {
  statusCode: number;
  errors: string[];
  warnings: string[];

  constructor(
    statusCode: number,
    message: string,
    errors: string[] = [],
    warnings: string[] = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.warnings = warnings;

    // Ensure the stack trace is captured correctly
    Error.captureStackTrace(this, this.constructor);
  }
}
