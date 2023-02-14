import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { ICreateProductBuy } from "../interfaces/IProductBuy";

export const CreateProductBuySchema: JoiSchema<ICreateProductBuy> = {
  productId: Joi.string().required(),
  price: Joi.number().required(),
};
