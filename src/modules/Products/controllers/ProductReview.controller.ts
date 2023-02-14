import { Request, Response } from "../../../shared/types/index";
import SERVICE_IDENTIFIERS from "@shared/constants/identifiers";
import { BaseController } from "@shared/helpers/base";
import { validate, validateRequiredUUID } from "@shared/middlewares/validation";
import { NextFunction } from "express";
import { controller, httpDelete, httpGet, httpPatch, httpPost, next, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { authenticate, grantAdminAaccess } from "@shared/middlewares/authentication";
import ProductReviewsService from "../services/ProductReviews.service";
import { CreateProductReviewSchema } from "../validators/createProductReview";
import { IProductReview } from "../interfaces/IProductReview";
import { UpdateProductReviewSchema } from "../validators/updateProductReviewValidator";

@controller("/product/review")
export class ProductReviewControllers extends BaseController {
  @inject(SERVICE_IDENTIFIERS.PRODUCTS_REVIEW_SERVICE) private readonly productReviewsService: ProductReviewsService;

  @httpPost("/", authenticate(), grantAdminAaccess(), validate({ schema: CreateProductReviewSchema }))
  async acceptOrRejectProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const details: IProductReview = req.body;
      details.reviewer_id = req.user.id
      const product_category = await this.productReviewsService.createProductReview(details);

      return this.resSuccess({ res, data: product_category, message: "" });
    } catch (error: any) {
      return this.resError({ error, res });
    }
  }

  @httpGet("/all", authenticate(), grantAdminAaccess())
  async getAllProductsReviewss(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const product_categories = await this.productReviewsService.getAllProductReviews();

      return this.resSuccess({ res, data: product_categories });
    } catch (error) {
      return next(error);
    }
  }

  @httpGet("/", authenticate(), grantAdminAaccess())
  async getAllProductsReviewsByreviewerId(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
        validateRequiredUUID({ id: req.query.reviewer_id  as string});
        const id = req.query.reviewer_id as string
      const product_categories = await this.productReviewsService.getProductReviewByReviwerId(id);

      return this.resSuccess({ res, data: product_categories });
    } catch (error) {
      return next(error);
    }
  }

  @httpGet("/:id", authenticate(), grantAdminAaccess())
  async getProductReviewById(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const id = req.params.id;
      const product_category = await this.productReviewsService.getProductReviewById(id);

      return this.resSuccess({ res, data: product_category });
    } catch (error) {
      return next(error);
    }
  }

  @httpPatch("/:id", authenticate(), grantAdminAaccess(), validate({ schema: UpdateProductReviewSchema }))
  async ReReviewAProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_id = req.params.id;

      const product_review_details: IProductReview = req.body;
      product_review_details.reviewer_id = req.user.id
      product_review_details.product_id = product_id

      const updated_user_details = await this.productReviewsService.updateProductReviewById(product_review_details);

      return this.resSuccess({ res, data: updated_user_details });
    } catch (error) {
      return next(error);
    }
  }

  @httpDelete("/:id", authenticate(), grantAdminAaccess())
  async deleteProductCategory(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_category_id = req.params.id;
      const response = await this.productReviewsService.deleteProductReviewById(product_category_id);

      return this.resSuccess({ res, data: "", message: response });
    } catch (error) {
      return next(error);
    }
  }
}
