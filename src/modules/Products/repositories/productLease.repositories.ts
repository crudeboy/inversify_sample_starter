import AppError from "../../../shared/utils/AppError";
import { injectable } from "inversify";
import { ICreateProductLease, IProductLease, IProductLeaseResponse, IUpdateProductLease } from "../interfaces/IProductLease";
import { Products_lease } from "../models/Objection_models/products_lease";

@injectable()
export default class ProductLeaseRepository {
  public async create(details: IProductLease): Promise<ICreateProductLease> {
    const product = await Products_lease.query().insert({ ...details });
    return product;
  }

  public async getById(id: string): Promise<IProductLeaseResponse> {
    const product = await Products_lease.query().findById(id);
    if (!product) {
      throw new AppError("Product Category not found", 404);
    }
    return product;
  }

  public async getAll(): Promise<IProductLeaseResponse[]> {
    const products = await Products_lease.query();
    if (!products.length) {
      throw new AppError("Products not found", 404);
    }
    return products;
  }

  public async updateById(details: IUpdateProductLease): Promise<number> {
    const { id, ...updates } = details;
    const product = await Products_lease.query()
      .findById(id)
      .patch({ ...updates });

    return product;
  }

  public async deleteById(id: string): Promise<number> {
    const response = await Products_lease.query().deleteById(id);
    return response;
  }
}
