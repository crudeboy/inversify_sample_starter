import AppError from "../../../shared/utils/AppError";
import { injectable } from "inversify";
import { ICreateProductBid, IProductBid, IProductBidResponse, IUpdateProductBid } from "../interfaces/IProductBid";
import { Products_bid } from "../models/Objection_models/products_bid";

@injectable()
export default class ProductBidRepository {
  public async create(details: IProductBid): Promise<ICreateProductBid> {
    const product = await Products_bid.query().insert({ ...details });
    return product;
  }

  public async getById(id: string): Promise<IProductBidResponse> {
    const product = await Products_bid.query().findById(id);
    if (!product) {
      throw new AppError("Product Category not found", 404);
    }
    return product;
  }

  public async getAll(): Promise<IProductBidResponse[]> {
    const products = await Products_bid.query();
    if (!products.length) {
      throw new AppError("Products not found", 404);
    }
    return products;
  }

  public async updateById(details: IUpdateProductBid): Promise<number> {
    const { id, ...updates } = details;
    const product = await Products_bid.query()
      .findById(id)
      .patch({ ...updates });

    return product;
  }

  public async deleteById(id: string): Promise<number> {
    const response = await Products_bid.query().deleteById(id);
    return response;
  }
}
