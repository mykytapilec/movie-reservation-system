import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode =
    typeof (error as { status?: number }).status === 'number'
      ? (error as { status: number }).status
      : 500;

  const message = error instanceof Error ? error.message : 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
  });
};
