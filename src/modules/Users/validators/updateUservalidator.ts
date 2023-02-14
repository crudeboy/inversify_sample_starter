import { JoiSchema } from '../../../shared/utils/validator';
import { IUpdateDetails, IUpdateUser } from '../Interfaces/IUpdateUser';
import Joi from 'joi';

export const UpdateUserSchema: JoiSchema<IUpdateDetails> = {
  full_name: Joi.string().optional(),
  address: Joi.string().optional(),
  country: Joi.string().optional(),
  profession: Joi.string().optional(),
  email: Joi.string().email().optional()
};
