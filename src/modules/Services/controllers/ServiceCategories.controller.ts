import { Request, Response } from "../../../shared/types/index";
import SERVICE_IDENTIFIERS from "@shared/constants/identifiers";
import { BaseController } from "@shared/helpers/base";
import { validate, validateRequiredUUID } from "@shared/middlewares/validation";
import { NextFunction } from "express";
import { controller, httpDelete, httpGet, httpPatch, httpPost, next, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import ServiceCategoryService from "../services/ServiceCategories.service";
import { CreateProductCatogorySchema } from "@modules/Products/validators/createProductCategoryValidator";
import { IServiceCategory } from "../interfaces/IServiceCategories";
import { UpdateServiceCatogorySchema } from "../validators/updateServiceCategoryValidator";
import { authenticate, grantAdminAaccess } from "@shared/middlewares/authentication";

@controller("/service/categories")
export class ServiceCategoryController extends BaseController {
  @inject(SERVICE_IDENTIFIERS.SERVICE_CATEGORY_SERVICE) private readonly serviceCategoryService: ServiceCategoryService;

  @httpPost("/", authenticate(), grantAdminAaccess(), validate({ schema: CreateProductCatogorySchema }))
  async createServiceCategory(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const details: IServiceCategory = req.body;
      const product_category = await this.serviceCategoryService.createServiceCategory(details);

      return this.resSuccess({ res, data: product_category, message: "" });
    } catch (error: any) {
      return this.resError({ error, res });
    }
  }

  @httpGet("/all")
  async getAllServiceCategories(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const product_categories = await this.serviceCategoryService.getAllServiceCategories();

      return this.resSuccess({ res, data: product_categories });
    } catch (error) {
      return next(error);
    }
  }

  @httpGet("/:id")
  async getServiceCategoryById(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const id = req.params.id;
      const product_category = await this.serviceCategoryService.getServiceCategoryById(id);

      return this.resSuccess({ res, data: product_category });
    } catch (error) {
      return next(error);
    }
  }

  @httpPatch("/:id", authenticate(), grantAdminAaccess(), validate({ schema: UpdateServiceCatogorySchema }))
  async updateerviceCategory(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_category_id = req.params.id;
      const product_category_details = req.body;
      const update_details = { id: product_category_id, ...product_category_details };
      const updated_user_details = await this.serviceCategoryService.updateServiceCategoryById(update_details);

      return this.resSuccess({ res, data: updated_user_details });
    } catch (error) {
      return next(error);
    }
  }

  @httpDelete("/:id", authenticate(), grantAdminAaccess())
  async deleteServiceCategory(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_category_id = req.params.id;
      const response = await this.serviceCategoryService.deleteServiceCategoryById(product_category_id);

      return this.resSuccess({ res, data: "", message: response });
    } catch (error) {
      return next(error);
    }
  }
}
