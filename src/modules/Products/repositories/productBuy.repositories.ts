import AppError from "../../../shared/utils/AppError";
import { injectable } from "inversify";
import { ICreateProduct, IProduct, IProductResponse, IUpdateProduct } from "../interfaces/IProduct";
import { Products_buy } from "../models/Objection_models/products_buy";
import { ICreateProductBuy, IProductBuy, IProductBuyResponse, IUpdateProductBuy } from "../interfaces/IProductBuy";

@injectable()
export default class ProductBuyRepository {
  public async create(details: IProductBuy): Promise<ICreateProductBuy> {
    const product = await Products_buy.query().insert({ ...details });
    return product;
  }

  public async getById(id: string): Promise<IProductBuyResponse> {
    const product = await Products_buy.query().findById(id);
    if (!product) {
      throw new AppError("Product Category not found", 404);
    }
    return product;
  }

  public async getAll(): Promise<IProductBuyResponse[]> {
    const products = await Products_buy.query();
    if (!products.length) {
      throw new AppError("Products not found", 404);
    }
    return products;
  }

  public async updateById(details: IUpdateProductBuy): Promise<number> {
    const { id, ...updates } = details;
    const product = await Products_buy.query()
      .findById(id)
      .patch({ ...updates });

    return product;
  }

  public async deleteById(id: string): Promise<number> {
    const response = await Products_buy.query().deleteById(id);
    return response;
  }
}
