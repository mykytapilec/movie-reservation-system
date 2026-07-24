import type { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import { Prisma } from '../generated/prisma/client.js';

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.flatten(),
    });

    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      res.status(409).json({
        success: false,
        message: 'Resource already exists',
      });

      return;
    }

    if (error.code === 'P2003') {
      res.status(400).json({
        success: false,
        message: 'Invalid related resource',
      });

      return;
    }

    if (error.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Resource not found',
      });

      return;
    }
  }

  const statusCode =
    typeof (error as { status?: number }).status === 'number'
      ? (error as { status: number }).status
      : 500;

  const message =
    error instanceof Error
      ? error.message
      : 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
  });
};