import AppError from "@shared/utils/AppError";
import { injectable } from "inversify";
import { ICreative } from "../Interfaces/ICreatives";
import { Creatives } from "../models/ObjectionModels/creatives";

@injectable()
export default class CreativesRepository {
  public async create(user_details: ICreative): Promise<ICreative> {
    const created_user = await Creatives.query().insert({ ...user_details });
    return created_user;
  }

  public async getByUserId(user_id: string): Promise<ICreative> {
    const creative = await Creatives.query().findOne({ user_id });
    if (!creative) {
      throw new AppError("User account not found", 404);
    }
    return creative;
  }

  public async getAll(): Promise<ICreative[]> {
    const creatives = await Creatives.query();
    return creatives;
  }
}
