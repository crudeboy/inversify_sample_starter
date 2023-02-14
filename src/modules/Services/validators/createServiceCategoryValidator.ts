import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IServiceCategory } from "../interfaces/IServiceCategories";

export const CreateServiceCatogorySchema: JoiSchema<IServiceCategory> = {
  name: Joi.string().required(),
  slug: Joi.string().required(),
  description: Joi.string().required(),
};
