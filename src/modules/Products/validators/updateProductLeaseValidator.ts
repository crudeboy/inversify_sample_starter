import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IUpdateProductLease } from "../interfaces/IProductLease";

export const UpdateProductLeaseSchema: JoiSchema<IUpdateProductLease> = {
  id: Joi.string().required(),
  price: Joi.number().required(),
  productId: Joi.string().required(),
  duration: Joi.string().required(),
};
