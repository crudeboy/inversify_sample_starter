import { REPOSITORIES } from "@shared/constants/identifiers";
import { inject, injectable } from "inversify";
import { ICreative } from "../Interfaces/ICreatives";
import { IFranchiseeUser } from "../Interfaces/IFranchiseeUser";
import CreativesRepository from "../repositories/creatives.repositories";

@injectable()
export default class CreativesService {
  @inject(REPOSITORIES.CREATIVES_RESPOSITORY) private readonly creativesRepository: CreativesRepository;

  public async createCreative(user_details: ICreative): Promise<ICreative> {
    const user = await this.creativesRepository.create(user_details);
    return user;
  }

  public async getCreativeById(user_id: string): Promise<ICreative> {
    const user = await this.creativesRepository.getByUserId(user_id);
    return user;
  }

  public async getCreatives(): Promise<ICreative[]> {
    const users = await this.creativesRepository.getAll();
    return users;
  }
}
