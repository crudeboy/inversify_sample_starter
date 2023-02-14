import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IUpdateProductBid } from "../interfaces/IProductBid";

export const UpdateProductBidSchema: JoiSchema<IUpdateProductBid> = {
  id: Joi.string().required(),
  price: Joi.number().required(),
  productId: Joi.string().required(),
  duration: Joi.string().required(),

  //   userId: string;
  //   name: string;
  //   description: string;
  //   price: string;
  //   status: string;
  //   imageUrl: string;
  //   videoUrl: string;
  //   audioUrl: string;
};
