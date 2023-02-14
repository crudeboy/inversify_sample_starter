import { validationException } from "@shared/Exceptions/validationException";
import AppError from "@shared/utils/AppError";
import JWTError from "@shared/utils/JWTError";
import { CelebrateError } from "celebrate";
import { injectable } from "inversify";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { MulterError } from "multer";
import { ValidationError } from "objection";
import { Request, Response } from "../types/index";

@injectable()
export class BaseController {
  protected resSuccess({ res, data, message = "", httpStatus = 200 }: { res: Response; data: any; message?: string; httpStatus?: number }) {
    return res.status(httpStatus).json({
      status: "success",
      message: message,
      data: data,
    });
  }

  protected resError({ res, code, message, error, httpStatus = 400 }: { res: Response; code?: string; message?: string; error?: any; httpStatus?: number }) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        // return res.json({
        success: false,
        message: error.message,
        data: null,
      });
    }

    if (error instanceof CelebrateError) {
      const bodyMessage = error.details.get("body")?.message;
      const queryMessage = error.details.get("query")?.message;
      const paramsMessage = error.details.get("params")?.message;

      return res.status(400).json({
        success: false,
        message: bodyMessage || queryMessage || paramsMessage,
        data: null,
      });
    }

    if (error instanceof ValidationError) {
      return res.status(422).json({
        success: false,
        message: "error.details[0].message",
        data: null,
      });
    }

    if (error instanceof validationException) {
      return res.status(422).json({
        success: false,
        // message: error.details[0].message,
        // error: error.error,
        message: error.errMsg,
        data: null,
      });
    }

    if (error instanceof MulterError && error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: `${error.message} ${error.field}, max image uploads allowed are 2.`,
        data: null,
      });
    }

    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token expired",
        data: null,
      });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Token invalid",
        data: null,
      });
    }

    if (error instanceof JWTError) {
      return res.status(401).json({
        success: false,
        message: error.message || "Token invalid",
        data: null,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errMessage: error.message,
      data: null,
    });
  }
}
