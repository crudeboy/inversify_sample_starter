import { Request, Response } from "../../../shared/types/index";
import SERVICE_IDENTIFIERS from "@shared/constants/identifiers";
import { BaseController } from "@shared/helpers/base";
import { validate, validateRequiredUUID } from "@shared/middlewares/validation";
import { NextFunction } from "express";
import { controller, httpDelete, httpGet, httpPatch, httpPost, next, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { UpdateServiceSchema } from "../validators/updateServiceValidator";
import { authenticate, grantAdminAaccess } from "@shared/middlewares/authentication";
import ServiceService from "../services/Service.service";
import { IService } from "../interfaces/IService";
import { CreateServiceSchema } from "../validators/createServiceValidator";
import { upload } from "@shared/middlewares/fileUpload";

@controller("/service")
export class ServiceControllers extends BaseController {
  @inject(SERVICE_IDENTIFIERS.SERVICE_SERVICE) private readonly serviceService: ServiceService;

  @httpPost("/", validate({ schema: CreateServiceSchema }), upload.single("file"))
  async createService(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const { location } = req.file as any;
      const product_details: IService = req.body;
      product_details.sampleUrl = location;
      const details: IService = req.body;
      const service = await this.serviceService.createService(details);

      return this.resSuccess({ res, data: service, message: "" });
    } catch (error: any) {
      return this.resError({ error, res });
    }
  }

  @httpGet("/all")
  async getAllService(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const service = await this.serviceService.getAllService();

      return this.resSuccess({ res, data: service });
    } catch (error) {
      return next(error);
    }
  }

  @httpGet("/:id")
  async getServiceById(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const id = req.params.id;
      const service = await this.serviceService.getServiceById(id);

      return this.resSuccess({ res, data: service });
    } catch (error) {
      return next(error);
    }
  }

  @httpPatch("/:id", authenticate(), grantAdminAaccess(), validate({ schema: UpdateServiceSchema }))
  async updateService(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_id = req.params.id;
      const product_details = req.body;
      const update_details = { id: product_id, ...product_details };
      const updated_user_details = await this.serviceService.updateServiceById(update_details);

      return this.resSuccess({ res, data: updated_user_details });
    } catch (error) {
      return next(error);
    }
  }

  @httpDelete("/:id", authenticate(), grantAdminAaccess())
  async deleteService(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const product_id = req.params.id;
      const response = await this.serviceService.deleteServiceById(product_id);

      return this.resSuccess({ res, data: "", message: response });
    } catch (error) {
      return next(error);
    }
  }
}
