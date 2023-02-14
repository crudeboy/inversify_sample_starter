import { REPOSITORIES } from "@shared/constants/identifiers";
import { inject, injectable } from "inversify";
import { IFranchiseeUser } from "../Interfaces/IFranchiseeUser";
import FranchiseesRepository from "../repositories/franchisees.repositories";

@injectable()
export default class FranchiseesService {
  @inject(REPOSITORIES.FRANCHISEES_RESPOSITORY) private readonly franchiseesRepository: FranchiseesRepository;

  public async createFranchisee(user_details: IFranchiseeUser): Promise<IFranchiseeUser> {
    const user = await this.franchiseesRepository.create(user_details);
    return user;
  }

  public async getFranchiseeById(user_id: string): Promise<IFranchiseeUser> {
    const user = await this.franchiseesRepository.getByUserId(user_id);
    return user;
  }

  public async getFranchisees(): Promise<IFranchiseeUser[]> {
    const users = await this.franchiseesRepository.getAll();
    return users;
  }
}
