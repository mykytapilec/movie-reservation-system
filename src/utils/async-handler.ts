import type { NextFunction, Request, RequestHandler, Response } from 'express';

export const asyncHandler = <T extends Request>(
  handler: (req: T, res: Response, next: NextFunction) => Promise<void>,
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(handler(req as T, res, next)).catch(next);
  };
};
