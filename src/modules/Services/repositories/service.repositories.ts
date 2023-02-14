import { injectable } from "inversify";
import { Service } from "../models/entities/service";
import { ICreateService, IService, IServiceResponse, IUpdateService } from "../interfaces/IService";

@injectable()
export default class ServiceRepository {
  public async create(detail: IService): Promise<ICreateService> {
    const service = await Service.query().insert({ ...detail });
    return service;
  }

  public async getById(id: string): Promise<IServiceResponse | undefined> {
    const service = await Service.query().findById(id);

    return service;
  }

  public async getAll(): Promise<IServiceResponse[]> {
    const service = await Service.query();

    return service;
  }

  public async updateById(details: IUpdateService): Promise<number> {
    const { id, ...updates } = details;
    const service = await Service.query()
      .findById(id)
      .patch({ ...updates });

    return service;
  }

  public async deleteById(id: string): Promise<number> {
    const response = await Service.query().deleteById(id);
    return response;
  }
}
