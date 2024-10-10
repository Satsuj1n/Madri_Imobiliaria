import { Request, Response, NextFunction, RequestHandler } from "express";

// Ajuste o handler para aceitar funções que retornam Promise ou void
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any> | void
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};
