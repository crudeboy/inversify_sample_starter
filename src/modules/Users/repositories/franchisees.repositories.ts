import AppError from "@shared/utils/AppError";
import { injectable } from "inversify";
import { IFranchiseeUser } from "../Interfaces/IFranchiseeUser";
import { Franchisees } from "../models/ObjectionModels/franchisees";

@injectable()
export default class FranchiseesRepository {
  public async create(user_details: IFranchiseeUser): Promise<IFranchiseeUser> {
    const created_user = await Franchisees.query().insert({ ...user_details });
    return created_user;
  }

  public async getByUserId(user_id: string): Promise<IFranchiseeUser> {
    const franchisee = await Franchisees.query().findOne({ user_id });
    if (!franchisee) {
      throw new AppError("User account not found", 404);
    }
    return franchisee;
  }

  public async getAll(): Promise<IFranchiseeUser[]> {
    const franchisees = await Franchisees.query();
    return franchisees;
  }
}
