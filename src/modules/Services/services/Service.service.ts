import AppError from "../../../shared/utils/AppError";
import { inject, injectable } from "inversify";
import { REPOSITORIES } from "@shared/constants/identifiers";
import ServiceRepository from "../repositories/service.repositories";
import { ICreateService, IService, IServiceResponse, IUpdateService } from "../interfaces/IService";

@injectable()
export default class ServiceCategoryService {
  @inject(REPOSITORIES.SERVICE_RESPOSITORY) private readonly serviceRepository: ServiceRepository;

  public async createService(detail: IService): Promise<ICreateService> {
    const service = await this.serviceRepository.create(detail);
    return service;
  }

  public async getServiceById(id: string): Promise<IServiceResponse> {
    const service = await this.serviceRepository.getById(id);
    if (!service) {
      throw new AppError("service  not found", 404);
    }
    return service;
  }

  public async getAllService(): Promise<IServiceResponse[]> {
    const service = await this.serviceRepository.getAll();
    if (!service.length) {
      throw new AppError("service  not found", 404);
    }
    return service;
  }

  public async updateServiceById(details: IUpdateService): Promise<IServiceResponse> {
    const { id, ...updates } = details;
    const update_response = await this.serviceRepository.updateById(details);
    if (!update_response) {
      throw new AppError("Could not update service .", 400);
    }
    const service = await this.getServiceById(id);
    return service;
  }

  public async deleteServiceById(id: string): Promise<string> {
    const response = await this.serviceRepository.deleteById(id);
    if (!response) throw new AppError("Could not delete service .", 400);
    return "service  successfully deleted";
  }
}
