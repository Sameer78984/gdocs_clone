import { Response } from 'express';

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  meta: any | null;
}

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T = {} as T,
  meta: any = null
) => {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    data,
    meta,
  };

  return res.status(statusCode).json(response);
};
