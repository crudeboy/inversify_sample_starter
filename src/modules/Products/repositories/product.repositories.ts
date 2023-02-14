import AppError from "../../../shared/utils/AppError";
import { injectable } from "inversify";
import { ICreateProduct, IProduct, IProductResponse, IUpdateProduct } from "../interfaces/IProduct";
import { Products } from "../models/Objection_models/products";

@injectable()
export default class ProductRepository {
  public async create(details: IProduct): Promise<ICreateProduct> {
    const product = await Products.query().insert({ ...details });
    return product;
  }

  public async getById(id: string): Promise<IProductResponse> {
    const product = await Products.query().findById(id);
    if (!product) {
      throw new AppError("Product Category not found", 404);
    }
    return product;
  }

  public async getAll(): Promise<IProductResponse[]> {
    const products = await Products.query();
    if (!products.length) {
      throw new AppError("Products not found", 404);
    }
    return products;
  }

  public async getAllPending(): Promise<IProductResponse[]> {
    const products = await Products.query().where("status", "pending");
    if (!products.length) {
      throw new AppError("Products not found", 404);
    }
    return products;
  }

  public async updateById(details: IUpdateProduct): Promise<number> {
    const { id, ...updates } = details;
    const product = await Products.query()
      .findById(id)
      .patch({ ...updates });

    return product;
  }

  public async deleteById(id: string): Promise<number> {
    const response = await Products.query().deleteById(id);
    return response;
  }
}
