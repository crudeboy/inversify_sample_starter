import { JoiSchema } from '../../../shared/utils/validator';
import Joi from 'joi';
import { IVerifyOtp } from '../Interfaces';

export const OtpSchema: JoiSchema<IVerifyOtp> = {
  otp: Joi.number().required(),
  email: Joi.string().email().required()
};
