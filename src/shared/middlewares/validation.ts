import joi from "joi";
import validator from "validator";
import { NextFunction } from "express";
import { Request, Response } from "../types";
import { validationException } from "../Exceptions/validationException";
import { JoiSchema, SCHEMA_OPTIONS } from "../../shared/utils/validator";
import { HTTPStatus } from "../../shared/constants/httpStatus";

export enum Locations {
  BODY = "body",
  PARAMS = "params",
  QUERY = "query",
}
interface ValidationOptions {
  location?: Locations;
  schema: JoiSchema<any>;
}

function formatError(error: joi.ValidationError, location: string) {
  return error.details.map((error) => {
    return {
      location,
      param: error.context?.key,
      msg: error.message,
    };
  });
}

function getLocation(req: Request, value: string) {
  switch (value) {
    case Locations.BODY:
      return req.body;
    case Locations.PARAMS:
      return req.params;
    case Locations.QUERY:
      return req.query;
    default:
      return req.body;
  }
}

export function validate(options: ValidationOptions, schemaOptions: any = SCHEMA_OPTIONS) {
  return (req: Request, res: Response, next: NextFunction) => {
    const location = getLocation(req, options.location || "body");
    const validator = joi.object().keys({ ...options.schema });

    const { error, value } = validator.validate(location, {
      ...schemaOptions,
    });
    // console.log(value, "value")
    if (error) {
      res.status(HTTPStatus.VALIDATION_ERROR);
      let errorMessage = "There were errors in your request";
      if (error?.details) {
        const errorDetails = error.details.map((each) => {
          return each.message;
        });
        errorMessage = errorDetails.join(",");
      }

      let validation_err = formatError(error, options.location || Locations.BODY);
      //   const err_message = {
      //     success: "false",
      //     error: errorMessage,
      //     validationError: formatError(error, options.location || Locations.BODY),
      //   };
      throw new validationException("validation error", 422, errorMessage, validation_err);
    }
    req.body = value;
    next();
  };
}

export function validateRequiredUUID(keyValueValidates: { [key: string]: string }) {
  const errors: string[] = [];
  Object.entries(keyValueValidates).forEach(([key, value]) => {
    if (!(value && validator.isUUID(value))) {
      console.log({ uuid: value });
      errors.push(`${key} MUST be valid uuid`);
    }
  });
  if (errors.length) {
    throw new validationException("validation error", 422, errors, errors);
  }
}
