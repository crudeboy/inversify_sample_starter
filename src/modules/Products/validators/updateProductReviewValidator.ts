import { JoiSchema } from "../../../shared/utils/validator";
import Joi from "joi";
import { IUpdateProductReviewRequest } from "../interfaces/IProductReview";

export const UpdateProductReviewSchema: JoiSchema<IUpdateProductReviewRequest> = {
  review_result: Joi.string().optional(),
  review: Joi.string().optional(),
};
