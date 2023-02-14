import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IForgetPassword } from "../Interfaces";

export const ForgetPasswordSchema: JoiSchema<IForgetPassword> = {
  url: Joi.string().required(),
  email: Joi.string().email().required(),
};
