import { Request, Response } from "../../../shared/types/index";
import { NextFunction } from "express";
import SERVICE_IDENTIFIERS from "../../../shared/constants/identifiers";
import { validate, validateRequiredUUID } from "../../../shared/middlewares/validation";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPatch, httpPost, next, request, response } from "inversify-express-utils";
import { BaseController } from "../../../shared/helpers/base";
import { adminAuthenticate, authenticate, grantAdminAaccess, grantFranchiseeAaccess } from "../../../shared/middlewares/authentication";
import ProductLeaseService from "../services/ProductLease.service";
import { IProductLease } from "../interfaces/IProductLease";
import { CreateProductLeaseSchema } from "../validators/createProductLeaseValidator";
import { UpdateProductLeaseSchema } from "../validators/updateProductLeaseValidator";

@controller("/product/lease")
export class ProductsLeaseControllers extends BaseController {
  @inject(SERVICE_IDENTIFIERS.PRODUCTS_LEASE_SERVICE) private readonly productLeaseService: ProductLeaseService;

  @httpPost("/", validate({ schema: CreateProductLeaseSchema }))
  async createProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const product_details: IProductLease = req.body;
      const new_product = await this.productLeaseService.createProductLease(product_details);

      return this.resSuccess({ res, data: new_product });
    } catch (error: any) {
      return next(error);
    }
  }

  @httpGet("/all") //to be corrected to keep the original authenticate middleware and add the admin check middle ware
  async getAllProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const product = await this.productLeaseService.getAllProductLease();
      return this.resSuccess({ res, data: product });
    } catch (error) {
      return next(error);
    }
  }

  @httpGet("/:id")
  async getProductById(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_id = req.params.id;
      const product = await this.productLeaseService.getProductLeaseById(product_id);
      return this.resSuccess({ res, data: product });
    } catch (error) {
      return next(error);
    }
  }

  @httpPatch("/:id", validate({ schema: UpdateProductLeaseSchema }))
  async updateProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_id = req.params.id;
      const product_details = req.body;
      const update_details = { product_id, ...product_details };
      const updated_product_details = await this.productLeaseService.updateProductLeaseById(update_details);

      return this.resSuccess({ res, data: updated_product_details });
    } catch (error) {
      return next(error);
    }
  }

  @httpDelete("/:id")
  async deleteProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_id = req.params.id;
      const delete_product_details = await this.productLeaseService.deleteProductLeaseById(product_id);

      return this.resSuccess({ res, data: delete_product_details });
    } catch (error) {
      return next(error);
    }
  }
}
