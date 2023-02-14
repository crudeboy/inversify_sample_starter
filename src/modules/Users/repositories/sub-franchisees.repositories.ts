import AppError from "@shared/utils/AppError";
import { injectable } from "inversify";
import { ISubFranchisee } from "../Interfaces/ISubFranchisee";
import { SubFranchsees } from "../models/ObjectionModels/sub-franchisees";

@injectable()
export default class SubFranchiseesRepository {
  public async create(user_details: ISubFranchisee): Promise<ISubFranchisee> {
    const created_user = await SubFranchsees.query().insert({ ...user_details });
    return created_user;
  }

  public async getByUserId(user_id: string): Promise<ISubFranchisee> {
    const sub_franchisee = await SubFranchsees.query().findOne({ user_id });
    if (!sub_franchisee) {
      throw new AppError("User account not found", 404);
    }
    return sub_franchisee;
  }

  public async getAll(): Promise<ISubFranchisee[]> {
    const sub_franchisee  = await SubFranchsees.query();
    return sub_franchisee ;
  }
}
