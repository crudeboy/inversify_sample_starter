import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IProductCategory, IUpdatProductCategory } from "../interfaces/IProductCategories";

export const UpdateProductCatogorySchema: JoiSchema<IProductCategory> = {
  name: Joi.string().optional(),
  slug: Joi.string().optional(),
  description: Joi.string().optional(),
};
