import { Request, Response, NextFunction } from 'express';
import { CelebrateError } from 'celebrate';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { ValidationError } from 'joi';
import AppError from '../utils/AppError';
import { MulterError } from 'multer';
import { validationException } from '../../shared/Exceptions/validationException';
import JWTError from '../../shared/utils/JWTError';
import AuthorizationError from '@shared/utils/AuthorizationError';

export default function errorHandler(error: Error, request: Request, response: Response, _: NextFunction): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).send({
      success: false,
      message: error.message,
      data: null
    });
  }

  if (error instanceof CelebrateError) {
    const bodyMessage = error.details.get('body')?.message;
    const queryMessage = error.details.get('query')?.message;
    const paramsMessage = error.details.get('params')?.message;

    return response.status(400).json({
      success: false,
      message: bodyMessage || queryMessage || paramsMessage,
      data: null
    });
  }

  if (error instanceof ValidationError) {
    return response.status(422).json({
      success: false,
      message: error.details[0].message,
      data: null
    });
  }

  if (error instanceof validationException) {
    return response.status(422).json({
      success: false,
      message: error.errMsg,
      data: null
    });
  }

  if (error instanceof MulterError && error.code === 'LIMIT_UNEXPECTED_FILE') {
    return response.status(400).json({
      success: false,
      message: `${error.message} ${error.field}, max image uploads allowed are 2.`,
      data: null
    });
  }

  if (error instanceof TokenExpiredError) {
    return response.status(401).json({
      success: false,
      message: 'Token expired',
      data: null
    });
  }

  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({
      success: false,
      message: 'Token invalid',
      data: null
    });
  }

  if (error instanceof JWTError) {
    return response.status(401).json({
      success: false,
      message: error.message || 'Token invalid',
      data: null
    });
  }

  if (error instanceof AuthorizationError) {
    return response.status(401).json({
      success: false,
      message: error.message,
      data: null
    });
  }

  return response.status(500).json({
    success: false,
    message: 'Internal server error',
    errMessage: error.message,
    data: null
  });
}
