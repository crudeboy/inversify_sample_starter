import { JoiSchema } from '../../../shared/utils/validator';
import Joi from 'joi';
import { ISignIn } from '../Interfaces/ISignIn';

export const SignInSchema: JoiSchema<ISignIn> = {
  password: Joi.string().required(),
  email: Joi.string().email().required()
};
