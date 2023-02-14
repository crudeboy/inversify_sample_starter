import SERVICE_IDENTIFIERS from "../../../shared/constants/identifiers";
import AppError from "../../../shared/utils/AppError";
import { inject, injectable } from "inversify";
import BcyptUtil from "../../../shared/services/Bcrypt";
import { IUpdateUser } from "../Interfaces/IUpdateUser";
import { IUser } from "../Interfaces/IUser";
import { IUserResponse, IFranchiseeResponse } from "../Interfaces/IUserResponse";
import UsersRepository from "../repositories/users.repositories";
import FranchiseesService from "./Franchisee.service";
import CreativesService from "./Creatives.service";
import SubFranchiseeService from "./SubFranchise.service";
import ClientsService from "./Clients.service";
import { MailService } from "@modules/Notifications/services/mail.service";
import { IAdminDetails } from "../Interfaces/IAdmin";

@injectable()
export default class UsersService {
  @inject(SERVICE_IDENTIFIERS.USERS_RESPOSITORY) private readonly userRepository: UsersRepository;
  @inject(SERVICE_IDENTIFIERS.FRANCHISEE_SERVICE) private readonly franchiseesService: FranchiseesService;
  @inject(SERVICE_IDENTIFIERS.CREATIVES_SERVICE) private readonly creativesService: CreativesService;
  @inject(SERVICE_IDENTIFIERS.SUB_FRANCHISEE_SERVICE) private readonly subFranchiseeService: SubFranchiseeService;
  @inject(SERVICE_IDENTIFIERS.CLIENTS_SERVICE) private readonly clientsService: ClientsService;
  @inject(SERVICE_IDENTIFIERS.BCRYPT_SERVICE) private readonly bcryptService: BcyptUtil;
  @inject(SERVICE_IDENTIFIERS.MAIL_SERVICE) private readonly mailService: MailService;

  public async createUser(user_details: IUser): Promise<IUserResponse> {
    const { email } = user_details;
    const check_email_exists = await this.userRepository.checkUserExistsByEmail(email);
    if (check_email_exists) {
      throw new AppError("User email already exists", 400);
    }
    const user = await this.userRepository.createUser(user_details);

    if (user_details.user_type === "franchise") {
      await this.franchiseesService.createFranchisee({ user_id: user.id, revenue: "0" });
    } else if (user_details.user_type === "creative") {
      await this.creativesService.createCreative({ user_id: user.id, revenue: "0" });
    } else if (user_details.user_type === "sub_frachise") {
      await this.subFranchiseeService.createSubFranchisee({ user_id: user.id, revenue: "0" });
    } else if (user_details.user_type === "client") {
      await this.clientsService.createClient({ user_id: user.id, revenue: "0" });
    }

    return user;
  }

  public async createSubFranchisee(franchisee_details: IUser): Promise<IFranchiseeResponse> {
    let password = "crea8tiveRevAdminPass1098";
    let hashed_password = await this.bcryptService.hashPassword(password);
    const { email } = franchisee_details;
    const check_email_exists = await this.checkUserEMailExists(email);
    if (check_email_exists) {
      throw new AppError("Sub-Franchisee email already exists", 400);
    }

    const sub_franchisee = await this.createUser({ ...franchisee_details, password: hashed_password });
    await this.mailService.sendCreateAdminMail({ password, to: email, url: "www.google.com" });
    return sub_franchisee;
  }

  public async createFranchisee(franchisee_details: IUser): Promise<IFranchiseeResponse> {
    const { email } = franchisee_details;
    const check_email_exists = await this.userRepository.checkUserExistsByEmail(email);
    if (check_email_exists) {
      throw new AppError("Franchisee email already exists", 400);
    }

    const franchisee = await this.userRepository.createUser(franchisee_details);
    return franchisee;
  }

  public async getUserById(user_id: string): Promise<IUserResponse> {
    const user = await this.userRepository.getUserById(user_id);
    if (!user) {
      throw new AppError("User account not found", 404);
    }
    return user;
  }

  public async getUserByEmail(email: string): Promise<IUserResponse> {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new AppError("User account not found", 404);
    }
    return user;
  }

  public async updateUserDetails(update_details: IUpdateUser): Promise<IUserResponse> {
    const { user_id } = update_details;
    const check_user_exists = await this.userRepository.checkUserExistsById(user_id);
    if (!check_user_exists) {
      throw new AppError("User not found.", 400);
    }
    const user = await this.userRepository.updateUserById(update_details);
    if (!user) {
      throw new AppError("Error occurred while updating user account", 400);
    }
    const updated_user = await this.userRepository.getUserById(user_id);
    return updated_user;
  }

  public async getAllUsers(): Promise<IUserResponse[]> {
    const users = await this.userRepository.getAllUsers();
    if (!users) {
      throw new AppError("Error occurred while fetching all users.", 400);
    }
    return users;
  }

  public async getAllCreatives(): Promise<IUserResponse[]> {
    const creatives = await this.userRepository.getAllCreatives();
    if (!creatives) {
      throw new AppError("Error occurred while fetching all creatives.", 400);
    }
    return creatives;
  }

  public async getAllFranchisees(): Promise<IUserResponse[]> {
    const franchisees = await this.userRepository.getAllFranchisees();
    if (!franchisees) {
      throw new AppError("Error occurred while fetching all franchisees.", 400);
    }
    return franchisees;
  }

  public async getAllSubFranchisees(): Promise<IUserResponse[]> {
    const sub_franchisees = await this.userRepository.getAllSubFranchisees();
    if (!sub_franchisees) {
      throw new AppError("Error occurred while fetching all sub-franchisees.", 400);
    }
    return sub_franchisees;
  }

  public async deleteUser(user_id: string): Promise<IUserResponse> {
    const check_user_exists = await this.userRepository.checkUserExistsById(user_id);
    if (!check_user_exists) {
      throw new AppError("User not found.", 400);
    }
    const user = await this.userRepository.deleteUserById(user_id);
    if (!user) {
      throw new AppError("Error occurred while deleting user account.", 400);
    }
    const deleted_user = await this.userRepository.getUserById(user_id);
    return deleted_user;
  }

  public async createAdminUser(admin: IAdminDetails): Promise<string> {
    const check_email_exists = await this.userRepository.checkUserExistsByEmail(admin.email);
    if (check_email_exists) {
      throw new AppError("User email already exists", 400);
    }

    const user = await this.userRepository.createAdminUser(admin);
    return user;
  }

  public async checkUserEMailExists(email: string): Promise<Boolean> {
    const user = await this.userRepository.checkUserExistsByEmail(email);
    return user ? true : false;
  }
}
