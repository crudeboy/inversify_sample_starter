import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IResetPassword } from "../Interfaces";

export const ResetPasswordSchema: JoiSchema<IResetPassword> = {
  token: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};
