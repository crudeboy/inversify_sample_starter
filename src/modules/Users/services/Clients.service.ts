import { REPOSITORIES } from "@shared/constants/identifiers";
import { inject, injectable } from "inversify";
import { IClients } from "../Interfaces/IClients";
import { ICreative } from "../Interfaces/ICreatives";
import { IFranchiseeUser } from "../Interfaces/IFranchiseeUser";
import ClientsRepository from "../repositories/clients.repositories";
import CreativesRepository from "../repositories/creatives.repositories";

@injectable()
export default class ClientsService {
  @inject(REPOSITORIES.CLIENTS_RESPOSITORY) private readonly clientsRepository: ClientsRepository;

  public async createClient(user_details: IClients): Promise<IClients> {
    const user = await this.clientsRepository.create(user_details);
    return user;
  }

  public async getClientById(user_id: string): Promise<IClients> {
    const user = await this.clientsRepository.getByUserId(user_id);
    return user;
  }

  public async getClients(): Promise<IClients[]> {
    const users = await this.clientsRepository.getAll();
    return users;
  }
}
