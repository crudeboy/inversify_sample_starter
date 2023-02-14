import AppError from "../../../shared/utils/AppError";
import { UserRolesId } from "../enums/userRoleEnum";
import { injectable, inject } from "inversify";
import BcyptUtil from "../../../shared/services/Bcrypt";
import SERVICE_IDENTIFIERS from "../../../shared/constants/identifiers";
import { IUpdateUser } from "../Interfaces/IUpdateUser";
import { IFranchisee, IUser } from "../Interfaces/IUser";
import { IUserResponse } from "../Interfaces/IUserResponse";
import { Users } from "../models/ObjectionModels/users";
import { IAdminDetails } from "../Interfaces/IAdmin";
//get user by user type

@injectable()
export default class UsersRepository {
  @inject(SERVICE_IDENTIFIERS.BCRYPT_SERVICE) private readonly bcryptService: BcyptUtil;

  public async createUser(user_details: IUser) {
    //consider using object type to store the roles_id
    let user_role_id;
    if (user_details.user_type === "client") user_role_id = UserRolesId.client;
    else if (user_details.user_type === "creative") user_role_id = UserRolesId.creative;
    else if (user_details.user_type === "sub_frachise") user_role_id = UserRolesId.sub_franchise;
    else if (user_details.user_type === "frachise") user_role_id = UserRolesId.franchise;

    const created_user = await Users.query().insert({ ...user_details, user_role_id });
    const { id, full_name, address, profession, email, gender, country, user_type } = created_user;
    const new_user = { full_name, address, profession, email, country, gender, user_type, id, is_email_verified: false, user_role_id };
    return new_user;
  }

  public async createAdminUser(admin_detail: IAdminDetails): Promise<string> {
    const { email, password, country } = admin_detail;
    const created_user = await Users.query().insert({ email, password, country, user_role_id: 5 });
    return "Admin account created successfully";
  }

  //collapse this into the create user repository method ***repo clean-up**
  public async createFranchisee(franchisee_details: IFranchisee) {
    const { password } = franchisee_details;
    const hashedPassword = await this.bcryptService.hashPassword(password);
    franchisee_details.password = hashedPassword;
    const created_franchisee = await Users.query().insert({ ...franchisee_details, user_type: "franchisee" });
    const { full_name, address, email, country, user_type, id } = created_franchisee;
    const new_franchisee = { full_name, address, email, country, user_type, id, is_email_verified: false };
    return new_franchisee;
  }

  public async getUserById(user_id: string): Promise<IUserResponse> {
    const user = await Users.query().findById(user_id).select("id", "full_name", "address", "country", "profession", "email", "user_type", "user_role_id");
    if (!user) {
      throw new AppError("User account not found", 404);
    }
    return user;
  }

  public async getUserByEmail(email: string): Promise<IUserResponse> {
    const user = await Users.query().findOne({ email }).select("id", "full_name", "address", "country", "profession", "email", "user_type", "password", "is_email_verified", "otp", "otp_expires_at", "user_role_id");
    if (!user) {
      throw new AppError("User account not found", 404);
    }
    return user;
  }

  public async checkUserExistsById(user_id: string): Promise<boolean> {
    const user = await Users.query().findById(user_id).select("id");
    return user ? true : false;
  }

  public async checkUserExistsByEmail(email: string): Promise<boolean> {
    const user = await Users.query().findOne({ email }).select("id");
    return user ? true : false;
  }

  public async getAllUsers(): Promise<IUserResponse[]> {
    const users = await Users.query().select("id", "full_name", "address", "country", "profession", "email", "user_type", "user_role_id");
    if (!users.length) {
      throw new AppError("Users not found", 404);
    }
    return users;
  }

  public async getAllCreatives(): Promise<IUserResponse[]> {
    const creatives = await Users.query().select("id", "full_name", "address", "country", "profession", "email", "user_type").where("user_type", "creative");
    if (!creatives.length) {
      throw new AppError("Creatives not found", 404);
    }
    return creatives;
  }

  public async getAllFranchisees(): Promise<IUserResponse[]> {
    const franchisees = await Users.query().select("id", "full_name", "address", "country", "email", "user_type").where("user_type", "franchisee");
    if (!franchisees.length) {
      throw new AppError("Franchisees not found", 404);
    }
    return franchisees;
  }

  public async getAllSubFranchisees(): Promise<IUserResponse[]> {
    const sub_franchisees = await Users.query().select("id", "full_name", "address", "country", "email", "user_type").where("user_type", "sub_franchise");
    if (!sub_franchisees.length) {
      throw new AppError("Sub-Franchisees not found", 404);
    }
    return sub_franchisees;
  }

  public async updateUserById(user_details: IUpdateUser): Promise<number> {
    const { user_id, ...update_details } = user_details;
    const user = await Users.query()
      .findById(user_id)
      .patch({ ...update_details });

    if (!user) {
      throw new AppError("User account not found", 404);
    }
    return user;
  }

  public async deleteUserById(user_id: string): Promise<IUserResponse | number> {
    const user = await Users.query().findById(user_id).patch({ is_deleted: true });
    return user;
  }
}
