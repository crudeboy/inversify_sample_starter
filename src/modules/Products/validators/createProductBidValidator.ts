import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { ICreateProductBid } from "../interfaces/IProductBid";

export const CreateProductBidSchema: JoiSchema<ICreateProductBid> = {
  productId: Joi.string().required(),
  price: Joi.number().required(),
  duration: Joi.string().required(),
};
