import { Request, Response, NextFunction } from "express";

type AppErrors = {
  message: string;
  status: number;
};

export function appErrors(
  error: AppErrors,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("middleware error: ", error);
  res.status(error.status || 500);
  res.json({ message: error.message });
}
