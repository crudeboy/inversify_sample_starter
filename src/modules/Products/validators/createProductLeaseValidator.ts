import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { ICreateProductLease } from "../interfaces/IProductLease";

export const CreateProductLeaseSchema: JoiSchema<ICreateProductLease> = {
  productId: Joi.string().required(),
  price: Joi.number().required(),
  duration: Joi.string().required(),
};
