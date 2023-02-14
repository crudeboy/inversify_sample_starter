import AppError from "@shared/utils/AppError";
import { injectable } from "inversify";
import { IClients } from "../Interfaces/IClients";
import { Clients } from "../models/ObjectionModels/clients";

@injectable()
export default class ClientsRepository {
  public async create(user_details: IClients): Promise<IClients> {
    const created_user = await Clients.query().insert({ ...user_details });
    return created_user;
  }

  public async getByUserId(user_id: string): Promise<IClients> {
    const client = await Clients.query().findOne({ user_id });
    if (!client) {
      throw new AppError("User account not found", 404);
    }
    return client;
  }

  public async getAll(): Promise<IClients[]> {
    const clients = await Clients.query();
    return clients;
  }
}
