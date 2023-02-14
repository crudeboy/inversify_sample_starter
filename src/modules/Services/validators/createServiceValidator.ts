import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { ICreateService } from "../interfaces/IService";

export const CreateServiceSchema: JoiSchema<ICreateService> = {
  name: Joi.string().required(),
  sampleUrl: Joi.string().required(),
  rate: Joi.string().required(),
  userId: Joi.string().required(),
  categoryId: Joi.string().required(),
  description: Joi.string().required(),
};
