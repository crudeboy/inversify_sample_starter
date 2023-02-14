import { REPOSITORIES } from "@shared/constants/identifiers";
import { inject, injectable } from "inversify";
import { ISubFranchisee } from "../Interfaces/ISubFranchisee";
import SubFranchiseesRepository from "../repositories/sub-franchisees.repositories";

@injectable()
export default class SubFranchiseeService {
  @inject(REPOSITORIES.SUB_FRANCHISEES_RESPOSITORY) private readonly SubFranchiseesRepository: SubFranchiseesRepository;

  public async createSubFranchisee(user_details: ISubFranchisee): Promise<ISubFranchisee> {
    const user = await this.SubFranchiseesRepository.create(user_details);
    return user;
  }

  public async getSubFranchiseeById(user_id: string): Promise<ISubFranchisee> {
    const user = await this.SubFranchiseesRepository.getByUserId(user_id);
    return user;
  }

  public async getSubFranchisees(): Promise<ISubFranchisee[]> {
    const users = await this.SubFranchiseesRepository.getAll();
    return users;
  }
}
