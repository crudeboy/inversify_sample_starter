import { Request, Response } from "../../../shared/types/index";
import { NextFunction } from "express";
import SERVICE_IDENTIFIERS from "../../../shared/constants/identifiers";
import { validate, validateRequiredUUID } from "../../../shared/middlewares/validation";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPatch, httpPost, next, request, response } from "inversify-express-utils";
import { BaseController } from "../../../shared/helpers/base";
import { adminAuthenticate, authenticate, grantAdminAaccess, grantFranchiseeAaccess } from "../../../shared/middlewares/authentication";
import ProductBuyService from "../services/ProductBuy.service";
import { IProductBuy } from "../interfaces/IProductBuy";
import { CreateProductBuySchema } from "../validators/createProductBuyValidator";
import { UpdateProductBuySchema } from "../validators/updateProductBuyValidator";

@controller("/product/buy")
export class ProductsBuyController extends BaseController {
  @inject(SERVICE_IDENTIFIERS.PRODUCTS_BUY_SERVICE) private readonly productBuyService: ProductBuyService;

  @httpPost("/", validate({ schema: CreateProductBuySchema }))
  async createProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const product_details: IProductBuy = req.body;
      const new_product = await this.productBuyService.createProductBuy(product_details);

      return this.resSuccess({ res, data: new_product });
    } catch (error: any) {
      return next(error);
    }
  }

  @httpGet("/all") //to be corrected to keep the original authenticate middleware and add the admin check middle ware
  async getAllProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const users = await this.productBuyService.getAllProductBuy();
      return this.resSuccess({ res, data: users });
    } catch (error) {
      return next(error);
    }
  }

  @httpGet("/:id")
  async getProductById(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_id = req.params.id;
      const user = await this.productBuyService.getProductBuyById(product_id);
      return this.resSuccess({ res, data: user });
    } catch (error) {
      return next(error);
    }
  }

  @httpPatch("/:id", validate({ schema: UpdateProductBuySchema }))
  async updateProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_id = req.params.id;
      const user_details = req.body;
      const update_details = { product_id, ...user_details };
      const updated_product_details = await this.productBuyService.updateProductBuyById(update_details);

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
      const delete_user_details = await this.productBuyService.deleteProductBuyById(product_id);

      return this.resSuccess({ res, data: delete_user_details });
    } catch (error) {
      return next(error);
    }
  }
}
