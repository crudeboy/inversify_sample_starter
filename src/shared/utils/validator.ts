import Joi, { AnySchema } from 'joi';

function joiValidate<T>(schema: any, data: any): { error: Joi.ValidationError | undefined; value: T } {
  return schema.validate(data);
}

export { joiValidate };

export type JoiSchema<T> = { [P in NonNullable<keyof T>]: AnySchema | any };

export const SCHEMA_OPTIONS = {
  abortEarly: false,
  stripUnknown: { objects: true },
  skipFunctions: true,
  escapeHtml: false
};
