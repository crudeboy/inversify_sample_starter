import { Request, Response } from "../../../shared/types/index";
import { NextFunction } from "express";
import SERVICE_IDENTIFIERS from "../../../shared/constants/identifiers";
import { validate, validateRequiredUUID } from "../../../shared/middlewares/validation";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPatch, httpPost, next, request, response } from "inversify-express-utils";
import { IUser } from "../Interfaces/IUser";
import UsersService from "../services/Users.service";
import { CreateFranchiseeSchema, CreateSubFranchiseeSchema, CreateUserSchema } from "../validators/createUserValidator";
import { UpdateUserSchema } from "../validators/updateUservalidator";
import { BaseController } from "../../../shared/helpers/base";
import { adminAuthenticate, authenticate, grantAdminAaccess, grantAdminAndFranchiseAaccess, grantFranchiseeAaccess } from "../../../shared/middlewares/authentication";
import UserTokenService from "../services/UserToken.service";
import { ForgetPasswordSchema } from "../validators/forgetPasswordValidator";
import { ResetPasswordSchema } from "../validators/resetPasswordValidator";
import ClientsService from "../services/Clients.service";

@controller("/users")
export class UsersController extends BaseController {
  @inject(SERVICE_IDENTIFIERS.USERS_SERVICE) private readonly usersService: UsersService;
  @inject(SERVICE_IDENTIFIERS.USER_TOKEN_SERVICE) private readonly userTokenService: UserTokenService;
  @inject(SERVICE_IDENTIFIERS.CLIENTS_SERVICE) private readonly clientsService: ClientsService;

  @httpPost("/", validate({ schema: CreateUserSchema }))
  async creteUserAccount(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const user_details: IUser = req.body;
      const new_user = await this.usersService.createUser(user_details);

      return this.resSuccess({ res, data: new_user });
    } catch (error: any) {
      console.log(error.message, "errror message");
      return next(error);
    }
  }

  @httpGet("/all", adminAuthenticate()) //to be corrected to keep the original authenticate middleware and add the admin check middle ware
  async getAllUsers(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const users = await this.usersService.getAllUsers();
      // console.log(users, "users");
      return this.resSuccess({ res, data: users });
    } catch (error) {
      return next(error);
    }
  }

  @httpGet("/subFranchisees/all", authenticate(), grantAdminAndFranchiseAaccess()) //to be corrected to keep the original authenticate middleware and add the admin check middle ware
  async getAllSubFranchisees(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const users = await this.usersService.getAllSubFranchisees();
      return this.resSuccess({ res, data: users });
    } catch (error: any) {
      return this.resError({ error, res });
    }
  }

  //depracated
  @httpGet("/subFranchisees/getAll", authenticate(), grantAdminAaccess()) //to be corrected to keep the original authenticate middleware and add the admin check middle ware
  async getAllSubFranchiseesAccount(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const users = await this.usersService.getAllSubFranchisees();
      return this.resSuccess({ res, data: users });
    } catch (error: any) {
      return this.resError({ error, res });
    }
  }

  //new end points added by Nsikak
  @httpGet("/creatives", adminAuthenticate())
  async getAllCreatives(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const creatives = await this.usersService.getAllCreatives();
      return this.resSuccess({ res, data: creatives });
    } catch (error) {
      return next(error);
    }
  }

  @httpPost("/franchisees", adminAuthenticate(), validate({ schema: CreateFranchiseeSchema }))
  async creteFranchiseeAccount(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const franchisee_details: IUser = req.body;
      const new_franchisee = await this.usersService.createFranchisee(franchisee_details);

      return this.resSuccess({ res, data: new_franchisee });
    } catch (error: any) {
      console.log(error.message, "errror message");
      return next(error);
    }
  }

  //create sub franchisee with email functionality
  @httpPost("/sub-franchisees", authenticate(), grantFranchiseeAaccess(), validate({ schema: CreateSubFranchiseeSchema }))
  async creteSubFranchiseeAccount(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const franchisee_details: IUser = req.body;
      const new_franchisee = await this.usersService.createSubFranchisee(franchisee_details);

      return this.resSuccess({ res, data: new_franchisee });
    } catch (error: any) {
      console.log(error.message, "errror message");
      return next(error);
    }
  }

  @httpGet("/franchisees", adminAuthenticate())
  async getAllFranchisees(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const franchisees = await this.usersService.getAllFranchisees();
      // console.log(franchisees, "franchisees");
      return this.resSuccess({ res, data: franchisees });
    } catch (error) {
      return next(error);
    }
  }

  @httpGet("/clients", adminAuthenticate())
  async getAllClients(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const clients = await this.clientsService.getClients();
      return this.resSuccess({ res, data: clients });
    } catch (error) {
      return next(error);
    }
  }

  //new end points added by Nsikak

  @httpGet("/:id")
  async getUserAccountById(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const user_id = req.params.id;
      const user = await this.usersService.getUserById(user_id);
      // console.log(user, "user");
      return this.resSuccess({ res, data: user });
    } catch (error) {
      return next(error);
    }
  }

  @httpPatch("/:id", validate({ schema: UpdateUserSchema }))
  async updateUser(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const user_id = req.params.id;
      const user_details = req.body;
      const update_details = { user_id, ...user_details };
      const updated_user_details = await this.usersService.updateUserDetails(update_details);

      return this.resSuccess({ res, data: updated_user_details });
    } catch (error) {
      return next(error);
    }
  }

  @httpDelete("/:id")
  async deleteUser(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      validateRequiredUUID({ id: req.params.id });
      const user_id = req.params.id;
      const delete_user_details = await this.usersService.deleteUser(user_id);

      return this.resSuccess({ res, data: delete_user_details });
    } catch (error) {
      return next(error);
    }
  }

  @httpPost("/resetPassword", validate({ schema: ResetPasswordSchema }))
  async verifyPassword(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const { token, email, password } = req.body;
      const message = await this.userTokenService.resetPassword(token, email, password);

      return this.resSuccess({ res, data: null, message: message });
    } catch (error: any) {
      console.log(error.message, "errror message");
      return next(error);
    }
  }

  @httpPost("/forgetPassword", validate({ schema: ForgetPasswordSchema }))
  async forgetPassword(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const { url, email } = req.body;
      const message = await this.userTokenService.forgetPassword(url, email);

      return this.resSuccess({ res, data: null, message: message });
    } catch (error: any) {
      console.log(error.message, "errror message");
      return this.resError({ error, res });
    }
  }
}
