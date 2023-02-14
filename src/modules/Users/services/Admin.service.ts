import SERVICE_IDENTIFIERS from "@shared/constants/identifiers";
import { inject, injectable, Container } from "inversify";
import UsersService from "./Users.service";
import BcyptUtil from "@shared/services/Bcrypt";
import { MailService } from "@modules/Notifications/services/mail.service";
import { IAdmin } from "../Interfaces/IAdmin";
import getDecorators from "inversify-inject-decorators";
import { IFranchiseeResponse, IUserResponse } from "../Interfaces/IUserResponse";
import AppError from "@shared/utils/AppError";
import { IUser } from "../Interfaces/IUser";
import FranchiseesService from "./Franchisee.service";
import { generatePasswordToken } from "@shared/services/OTP";

//this line 11 - 19 is atrue life saver/// treat with care
// let container = new Container();
// let { lazyInject } = getDecorators(container);
//******* */

@injectable()
export default class AdminService {
  @inject(SERVICE_IDENTIFIERS.USERS_SERVICE) private readonly usersService: UsersService;
  @inject(SERVICE_IDENTIFIERS.FRANCHISEE_SERVICE) private readonly franchiseesService: FranchiseesService;
  @inject(SERVICE_IDENTIFIERS.BCRYPT_SERVICE) private readonly bcryptService: BcyptUtil;
  @inject(SERVICE_IDENTIFIERS.MAIL_SERVICE) private readonly mailService: MailService;

  public async createAdminAccount(user_details: IAdmin): Promise<string> {
    let generatePassword = generatePasswordToken()
    let password = await this.bcryptService.hashPassword(generatePassword);
    let admin_details = {...user_details, password}
    const { email, country } = user_details;

    const user = await this.usersService.createAdminUser(admin_details);
    const mail_response = await this.mailService.sendAccountCreationMail({ password: generatePassword, to: email, url: "www.google.com" }, 'Admin');
    console.log(mail_response, "mail_response")
    return user;
  }

  public async getAllCreatives(): Promise<IUserResponse[]> {
    const creatives = await this.usersService.getAllCreatives();
    if (!creatives) {
      throw new AppError("Error occurred while fetching all creatives.", 400);
    }
    return creatives;
  }

  public async getAllFranchisees(): Promise<IUserResponse[]> {
    const franchisees = await this.usersService.getAllFranchisees();
    if (!franchisees) {
      throw new AppError("Error occurred while fetching all franchisees.", 400);
    }
    return franchisees;
  }

  //the admin service isn't creating new methods
  public async getAllSubFranchisees(): Promise<IUserResponse[]> {
    const sub_franchisees = await this.usersService.getAllSubFranchisees();
    if (!sub_franchisees) {
      throw new AppError("Error occurred while fetching all sub_franchisees.", 400);
    }
    return sub_franchisees;
  }

  public async createFranchisee(franchisee_details: IUser): Promise<IFranchiseeResponse> {
    let generatePassword = generatePasswordToken()
    let password = await this.bcryptService.hashPassword(generatePassword);
    const { email } = franchisee_details;

    const franchisee = await this.usersService.createFranchisee({ ...franchisee_details, password });
    await this.franchiseesService.createFranchisee({ user_id: franchisee.id, revenue: "0" });
    await this.mailService.sendAccountCreationMail({ password: generatePassword, to: email, url: "www.google.com" }, 'Franchise');
    return franchisee;
  }
}
