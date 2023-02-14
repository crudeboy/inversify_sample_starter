import AppError from "../../../shared/utils/AppError";
import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIERS from "@shared/constants/identifiers";
import ServiceCategoryRepository from "../repositories/serviceCategories.repositories";
import { IServiceCategory, IServiceCategoryResponse, IUpdatServiceCategory } from "../interfaces/IServiceCategories";


@injectable()
export default class ServiceCategoryService {
  @inject(SERVICE_IDENTIFIERS.SERVICE_CATEGORY_RESPOSITORY) private readonly serviceCategoryRepository: ServiceCategoryRepository;

  public async createServiceCategory(detail: IServiceCategory): Promise<IServiceCategory> {
    const service_category = await this.serviceCategoryRepository.create(detail);
    return service_category;
  }

  public async getServiceCategoryById(id: string): Promise<IServiceCategoryResponse> {
    const service_category = await this.serviceCategoryRepository.getById(id);
    if (!service_category) {
      throw new AppError("service Category not found", 404);
    }
    return service_category;
  }

  public async getAllServiceCategories(): Promise<IServiceCategoryResponse[]> {
    const service_categories = await this.serviceCategoryRepository.getAll();
    if (!service_categories.length) {
      throw new AppError("service Category not found", 404);
    }
    return service_categories;
  }

  public async updateServiceCategoryById(details: IUpdatServiceCategory): Promise<IServiceCategoryResponse> {
    const { id, ...updates } = details;
    const update_response = await this.serviceCategoryRepository.updateById(details);
    if (!update_response) {
      throw new AppError("Could not update service Category.", 400);
    }
    const service_category = await this.getServiceCategoryById(id);
    return service_category;
  }

  public async deleteServiceCategoryById(id: string): Promise<string> {
    const response = await this.serviceCategoryRepository.deleteById(id);
    if (!response) throw new AppError("Could not delete service Category.", 400);
    return "service Category successfully deleted";
  }
}
