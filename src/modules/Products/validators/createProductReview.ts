import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IProductReviewRequest } from "../interfaces/IProductReview";

export const CreateProductReviewSchema: JoiSchema<IProductReviewRequest> = {
  product_id: Joi.string().guid({ version: "uuidv4" }),
  review_result: Joi.string().required(),
  review: Joi.string().required(),
};
