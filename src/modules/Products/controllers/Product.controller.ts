import { UpdateProductSchema } from "./../validators/updateProductValidator";
import { IProduct } from "./../interfaces/IProduct";
import { Request, Response } from "../../../shared/types/index";
import { NextFunction } from "express";
import SERVICE_IDENTIFIERS from "../../../shared/constants/identifiers";
import { validate, validateRequiredUUID } from "../../../shared/middlewares/validation";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPatch, httpPost, next, request, response } from "inversify-express-utils";
import ProductsService from "../services/Product.service";
import { CreateProductSchema } from "../validators/createProductValidator";
import { BaseController } from "../../../shared/helpers/base";
import { adminAuthenticate, authenticate, grantAdminAaccess, grantFranchiseeAaccess } from "../../../shared/middlewares/authentication";
import { upload } from "@shared/middlewares/fileUpload";

@controller("/product")
export class ProductsControllers extends BaseController {
  @inject(SERVICE_IDENTIFIERS.PRODUCTS_SERVICE) private readonly productsService: ProductsService;

  @httpPost("/", upload.single("file"))
  async createProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const { location } = req.file as any;
      const product_details: IProduct = req.body;
      product_details.imageUrl = location;
      const new_product = await this.productsService.createProduct(product_details);

      return this.resSuccess({ res, data: new_product });
    } catch (error: any) {
      return next(error);
    }
  }

  @httpGet("/all") //to be corrected to keep the original authenticate middleware and add the admin check middle ware
  async getAllProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const product = await this.productsService.getAllProducts();
      // console.log(product, "product");
      return this.resSuccess({ res, data: product });
    } catch (error) {
      return next(error);
    }
  }

  @httpGet("/pending") //to be corrected to keep the original authenticate middleware and add the admin check middle ware
  async getAllPendingProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const product = await this.productsService.getAllPendingProducts();
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
      const user = await this.productsService.getProductById(product_id);
      return this.resSuccess({ res, data: user });
    } catch (error) {
      return next(error);
    }
  }

  @httpPatch("/:id", validate({ schema: UpdateProductSchema }))
  async updateProduct(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_id = req.params.id;
      const user_details = req.body;
      const update_details = { id: product_id, ...user_details };
      const updated_product_details = await this.productsService.updateProductById(update_details);

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
      const delete_user_details = await this.productsService.deleteProductById(product_id);

      return this.resSuccess({ res, data: delete_user_details });
    } catch (error) {
      return next(error);
    }
  }
}
