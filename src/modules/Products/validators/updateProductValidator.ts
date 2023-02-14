import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IUpdateProduct } from "../interfaces/IProduct";

export const UpdateProductSchema: JoiSchema<IUpdateProduct> = {
  id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().optional(),
  categoryId: Joi.string().required(),
  imageUrl: Joi.string(),
  videoUrl: Joi.string(),
  audioUrl: Joi.string(),
  buy: Joi.boolean().required(),
  lease: Joi.boolean().required(),
  bid: Joi.boolean().required(),
  stockQuantity: Joi.number(),
  bidDuration: Joi.string(),
  bidPrice: Joi.number(),
  buyPrice: Joi.number(),
  leasePrice: Joi.number(),
  leasePeriod: Joi.string(),
};
