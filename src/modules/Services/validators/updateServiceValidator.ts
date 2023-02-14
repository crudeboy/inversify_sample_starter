import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IUpdateService } from "../interfaces/IService";

export const UpdateServiceSchema: JoiSchema<IUpdateService> = {
  id: Joi.string().required(),
  name: Joi.string().required(),
  sampleUrl: Joi.string().required(),
  rate: Joi.string().required(),
  userId: Joi.string().required(),
  categoryId: Joi.string().required(),
  description: Joi.string().required(),
};
