import { Request, Response } from "../../../shared/types/index";
import SERVICE_IDENTIFIERS from "@shared/constants/identifiers";
import { BaseController } from "@shared/helpers/base";
import { validate } from "@shared/middlewares/validation";
import { NextFunction } from "express";
import { controller, httpGet, httpPost, next, request, response } from "inversify-express-utils";
import AdminService from "../services/Admin.service";
import { CreateAdminSchema } from "../validators/createAdminValidator";
import { IAdmin } from "../Interfaces/IAdmin";
import getDecorators from "inversify-inject-decorators";
import container from "@config/ioc";
import { authenticate, grantAdminAaccess, grantAdminAndFranchiseAaccess } from "@shared/middlewares/authentication";
import { CreateFranchiseeSchema } from "../validators/createUserValidator";
import { IUser } from "../Interfaces/IUser";
import { inject } from "inversify";

let { lazyInject } = getDecorators(container);

@controller("/admin")
export class AdminController extends BaseController {
  @inject(SERVICE_IDENTIFIERS.ADMIN_SERVICE) private readonly adminService: AdminService;

  @httpPost("/", validate({ schema: CreateAdminSchema }))
  async signUp(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const user_details: IAdmin = req.body;
      const success_message = await this.adminService.createAdminAccount(user_details);

      return this.resSuccess({ res, data: "", message: success_message });
    } catch (error: any) {
      return this.resError({ error, res });
    }
  }

  @httpGet("/creatives", authenticate(), grantAdminAaccess())
  async getAllCreatives(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const creatives = await this.adminService.getAllCreatives();
      return this.resSuccess({ res, data: creatives });
    } catch (error: any) {
      console.log(error.message, "error.message");
      return this.resError({ error, res });
    }
  }

  @httpPost("/franchisees", authenticate(), grantAdminAaccess(), validate({ schema: CreateFranchiseeSchema }))
  async creteFranchiseeAccount(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const franchisee_details: IUser = req.body;
      const new_franchisee = await this.adminService.createFranchisee(franchisee_details);

      return this.resSuccess({ res, data: new_franchisee });
    } catch (error: any) {
      return this.resError({ error, res });
    }
  }

   @httpGet("/subFranchisees/all", authenticate(), grantAdminAndFranchiseAaccess())
  async getAllSubFranchisees(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const sub_franchisees = await this.adminService.getAllSubFranchisees()
      return this.resSuccess({ res, data: sub_franchisees });
    } catch (error: any) {
      return this.resError({ error, res });
    }
  }

  @httpGet("/franchisees", authenticate(), grantAdminAaccess())
  async getAllFranchisees(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const franchisees = await this.adminService.getAllFranchisees();
      return this.resSuccess({ res, data: franchisees });
    } catch (error) {
      return this.resError({ error, res });
    }
  }
}
