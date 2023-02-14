import { JoiSchema } from '../../../shared/utils/validator';
import Joi from 'joi';
import { IEmail } from '../Interfaces';

export const EmailSchema: JoiSchema<IEmail> = {
  email: Joi.string().email().required()
};
