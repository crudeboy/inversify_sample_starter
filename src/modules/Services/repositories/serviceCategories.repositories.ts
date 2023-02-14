import { injectable } from "inversify";
import { ServiceCategories } from "../models/entities/service_categories";
import { IServiceCategory, IServiceCategoryResponse, IUpdatServiceCategory } from "../interfaces/IServiceCategories";

@injectable()
export default class ServiceCategoryRepository {
  public async create(detail: IServiceCategory): Promise<IServiceCategory> {
    const service_category = await ServiceCategories.query().insert({ ...detail });
    return service_category;
  }

  public async getById(id: string): Promise<IServiceCategoryResponse | undefined> {
    const service_category = await ServiceCategories.query().findById(id);

    return service_category;
  }

  public async getAll(): Promise<IServiceCategoryResponse[]> {
    const service_category = await ServiceCategories.query();

    return service_category;
  }

  public async updateById(details: IUpdatServiceCategory): Promise<number> {
    const { id, ...updates } = details;
    const service_category = await ServiceCategories.query()
      .findById(id)
      .patch({ ...updates });

    return service_category;
  }

  public async deleteById(id: string): Promise<number> {
    const response = await ServiceCategories.query().deleteById(id);
    return response;
  }
}
