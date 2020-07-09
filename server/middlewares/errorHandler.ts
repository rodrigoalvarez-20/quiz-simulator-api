import { NextFunction, Request, Response } from "express";
import { HttpException } from "../middlewares";
import { BAD_REQUEST } from "http-status-codes";

function errorHandler(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || BAD_REQUEST;
  const message = error.message || "Ha ocurrido un error en la request";
  const error_msg = error.error_full ? error.error_full : error.message;
  return response.status(status).json({
    status,
    message,
    error: error_msg,
  });
}

export default errorHandler;
