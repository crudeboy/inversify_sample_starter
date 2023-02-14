import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IUpdateProductBuy } from "../interfaces/IProductBuy";

export const UpdateProductBuySchema: JoiSchema<IUpdateProductBuy> = {
  id: Joi.string().required(),
  price: Joi.number().required(),
  productId: Joi.string().required(),

  //   userId: string;
  //   name: string;
  //   description: string;
  //   price: string;
  //   status: string;
  //   imageUrl: string;
  //   videoUrl: string;
  //   audioUrl: string;
};
