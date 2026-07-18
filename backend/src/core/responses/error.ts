import { Response } from 'express';

export interface ErrorResponse {
  success: false;
  message: string;
  errors: any[];
}

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  errors: any[] = []
) => {
  const response: ErrorResponse = {
    success: false,
    message,
    errors,
  };

  return res.status(statusCode).json(response);
};
