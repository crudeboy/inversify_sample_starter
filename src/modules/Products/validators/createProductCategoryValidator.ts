import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IProductCategory } from "../interfaces/IProductCategories";

export const CreateProductCatogorySchema: JoiSchema<IProductCategory> = {
  name: Joi.string().required(),
  slug: Joi.string().required(),
  description: Joi.string().required(),
};
