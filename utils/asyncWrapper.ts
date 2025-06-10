import { Request, Response, NextFunction } from "express";

type ExpressRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | void;

export const asyncWrapper = (requestHandler: ExpressRequestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
