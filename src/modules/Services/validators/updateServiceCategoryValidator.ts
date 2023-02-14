import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IServiceCategory } from "../interfaces/IServiceCategories";

export const UpdateServiceCatogorySchema: JoiSchema<IServiceCategory> = {
  name: Joi.string().optional(),
  slug: Joi.string().optional(),
  description: Joi.string().optional(),
};
