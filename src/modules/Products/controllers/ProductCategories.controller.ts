import { Request, Response } from "../../../shared/types/index";
import SERVICE_IDENTIFIERS from "@shared/constants/identifiers";
import { BaseController } from "@shared/helpers/base";
import { validate, validateRequiredUUID } from "@shared/middlewares/validation";
import { NextFunction } from "express";
import { controller, httpDelete, httpGet, httpPatch, httpPost, next, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import ProductCategoryService from "../services/ProductCategories.service";
import { CreateProductCatogorySchema } from "../validators/createProductCategoryValidator";
import { IProductCategory } from "../interfaces/IProductCategories";
import { UpdateProductCatogorySchema } from "../validators/updateProductCategoryValidator";
import { authenticate, grantAdminAaccess } from "@shared/middlewares/authentication";

@controller("/product/categories")
export class ProductCategoriesController extends BaseController {
  @inject(SERVICE_IDENTIFIERS.PRODUCT_CATEGORY_SERVICE) private readonly productCategoryService: ProductCategoryService;

  @httpPost("/", authenticate(), grantAdminAaccess(), validate({ schema: CreateProductCatogorySchema }))
  async createProductCategory(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const details: IProductCategory = req.body;
      const product_category = await this.productCategoryService.create(details);

      return this.resSuccess({ res, data: product_category, message: "" });
    } catch (error: any) {
      return this.resError({ error, res });
    }
  }

  @httpGet("/all")
  async getAllProductsCategories(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const product_categories = await this.productCategoryService.getAll();

      return this.resSuccess({ res, data: product_categories });
    } catch (error) {
      return next(error);
    }
  }

  @httpGet("/:id")
  async getProductCategoryById(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const id = req.params.id;
      const product_category = await this.productCategoryService.getById(id);

      return this.resSuccess({ res, data: product_category });
    } catch (error) {
      return next(error);
    }
  }

  @httpPatch("/:id", authenticate(), grantAdminAaccess(), validate({ schema: UpdateProductCatogorySchema }))
  async updateProductCategory(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_category_id = req.params.id;
      console.log(product_category_id, "product_category_id");
      const product_category_details = req.body;
      const update_details = { id: product_category_id, ...product_category_details };
      console.log(update_details, "update_details");
      const updated_user_details = await this.productCategoryService.updateProductCategoryById(update_details);

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
      const response = await this.productCategoryService.deleteProductCategoryById(product_category_id);

      return this.resSuccess({ res, data: "", message: response });
    } catch (error) {
      return next(error);
    }
  }
}
