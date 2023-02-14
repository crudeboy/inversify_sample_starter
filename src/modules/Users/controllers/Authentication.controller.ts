import { Request, Response } from "../../../shared/types/index";
import { NextFunction } from "express";
import SERVICE_IDENTIFIERS from "../../../shared/constants/identifiers";
import { BaseController } from "../../../shared/helpers/base";
import { validate } from "../../../shared/middlewares/validation";
import { Container, inject } from "inversify";
import { controller, httpPost, next, request, response } from "inversify-express-utils";
import AuthenticationService from "../services/Auth.service";
import { CreateUserSchema } from "../validators/createUserValidator";
import { IUser } from "../Interfaces/IUser";
import { SignInSchema } from "../validators/signInValidator";
import { EmailSchema } from "../validators/emialValidator";
import { OtpSchema } from "../validators/otpValidator";

@controller("/auth")
export class AuthenticationsControllers extends BaseController {
  @inject(SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE) private readonly authenticationService: AuthenticationService;

  @httpPost("/signUp", validate({ schema: CreateUserSchema }))
  async signUp(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const user_details: IUser = req.body;
      const new_user = await this.authenticationService.signUp(user_details);

      return this.resSuccess({ res, data: new_user });
    } catch (error: any) {
      console.log(error.message, "error");
      return next(error);
    }
  }

  @httpPost("/signIn", validate({ schema: SignInSchema }))
  async logIn(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const user_details = req.body;
      const new_user = await this.authenticationService.signIn(user_details);

      return this.resSuccess({ res, data: new_user });
    } catch (error: any) {
      console.log(error.message, "error");
      return next(error);
    }
  }

  @httpPost("/getOtp", validate({ schema: EmailSchema }))
  async generateOtp(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const { email } = req.body;
      const otp_msg = await this.authenticationService.generateOTP(email);

      return this.resSuccess({ res, message: otp_msg, data: null });
    } catch (error) {
      return next(error);
    }
  }

  @httpPost("/verifyOtp", validate({ schema: OtpSchema }))
  async verifyOtp(@request() req: Request, @response() res: Response, @next() next: NextFunction) {
    try {
      const { email, otp } = req.body;
      const otp_msg = await this.authenticationService.verifyOTP(email, otp);

      return this.resSuccess({ res, message: otp_msg, data: null });
    } catch (error) {
      return next(error);
    }
  }
}
