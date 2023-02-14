import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { ICreateProduct } from "../interfaces/IProduct";

export const CreateProductSchema: JoiSchema<ICreateProduct> = {
  name: Joi.string().required(),
  id: Joi.string().optional(),
  categoryId: Joi.string().required(),
  description: Joi.string().required(),
  lease: Joi.boolean().required(),
  bid: Joi.boolean().required(),
  buy: Joi.boolean().required(),
  bidPrice: Joi.number().optional(),
  buyPrice: Joi.number().optional(),
  leasePrice: Joi.number().optional(),
  bidDuration: Joi.string().optional(),
  leasePeriod: Joi.number().optional(),
};
