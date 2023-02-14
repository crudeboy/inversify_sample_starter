import { MailService } from "../../Notifications/services/mail.service";
import SERVICE_IDENTIFIERS from "../../../shared/constants/identifiers";
import BcyptUtil from "../../../shared/services/Bcrypt";
import JwtClient from "../../../shared/services/JWT";
import { generateOTP } from "../../../shared/services/OTP";
import AppError from "../../../shared/utils/AppError";
import { inject, injectable } from "inversify";
import { ILoggedInUser } from "../Interfaces/ILoggedInUser";
import { ISignIn } from "../Interfaces/ISignIn";
import { IUser } from "../Interfaces/IUser";
import UsersService from "./Users.service";
import { validationException } from "@shared/Exceptions/validationException";

@injectable()
export default class AuthenticationService {
  @inject(SERVICE_IDENTIFIERS.USERS_SERVICE) private readonly usersService: UsersService;
  @inject(SERVICE_IDENTIFIERS.BCRYPT_SERVICE) private readonly bcryptService: BcyptUtil;
  @inject(SERVICE_IDENTIFIERS.JWT_SERVICE) private readonly jwtService: JwtClient;
  @inject(SERVICE_IDENTIFIERS.MAIL_SERVICE) private readonly mailService: MailService;

  public async signUp(user_details: IUser): Promise<ILoggedInUser> {
    const { password } = user_details;
    const hashedPassword = await this.bcryptService.hashPassword(password);
    user_details.password = hashedPassword;

    const user = await this.usersService.createUser(user_details);
    const { id, user_type, email } = user;
    const token = await this.jwtService.generateAccessToken({ id, user_type, email });
    const refresh_token = await this.jwtService.generateRefreshToken({ id, user_type, email });

    return {
      ...user,
      token,
      refresh_token,
    };
  }

  public async signIn(signin_inputs: ISignIn) {
    const { email, password } = signin_inputs;
    const user = await this.usersService.getUserByEmail(email);
    const verify_password = await this.bcryptService.validatePassword(password, user.password || "");
    if (!verify_password) {
      throw new AppError("Invalid Details.", 403);
    }
    const { id, user_type } = user;
    const token = await this.jwtService.generateAccessToken({ id, user_type, email });
    const refresh_token = await this.jwtService.generateRefreshToken({ id, user_type, email });

    return {
      ...user,
      token,
      refresh_token,
    };
  }

  public async generateOTP(email: string): Promise<string> {
    const user = await this.usersService.getUserByEmail(email);
    if (user.is_email_verified) {
      throw new AppError("User email is already verified.", 400);
    }
    const otp = await generateOTP();
    const otp_expires_at = Date.now() + 300000; //5mins

    await this.usersService.updateUserDetails({ user_id: user.id, otp, otp_expires_at });

    await this.mailService.sendMail({ otp, to: email });

    return "Otp successfully sent.";
  }

  public async verifyOTP(email: string, otp: number): Promise<string> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user.otp || !user.otp_expires_at) {
      throw new AppError("Userotp not found.", 400);
    }
    if (user.is_email_verified) {
      throw new AppError("User email is already verified.", 400);
    }
    if (Date.now() > user.otp_expires_at) {
      throw new AppError("OTP already expired.", 400);
    }
    if (otp !== Number(user.otp)) {
      throw new AppError("Incorrect OTP.", 400);
    }

    await this.usersService.updateUserDetails({ user_id: user.id, is_email_verified: true });
    return "Email successfully verified.";
  }
}
