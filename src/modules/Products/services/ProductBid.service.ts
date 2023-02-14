import AppError from "../../../shared/utils/AppError";
import { inject, injectable } from "inversify";
import { REPOSITORIES } from "@shared/constants/identifiers";
import ProductBidRepository from "../repositories/productBid.repositories";
import { ICreateProductBid, IProductBid, IProductBidResponse, IUpdateProductBid } from "../interfaces/IProductBid";

@injectable()
export default class ProductBidService {
  @inject(REPOSITORIES.PRODUCTS_BID_RESPOSITORY) private readonly productBidRepository: ProductBidRepository;

  public async createProductBid(details: IProductBid): Promise<ICreateProductBid> {
    const product = await this.productBidRepository.create(details);
    return product;
  }

  public async getProductBidById(id: string): Promise<IProductBidResponse> {
    const product = await this.productBidRepository.getById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }

  public async getAllProductBid(): Promise<IProductBidResponse[]> {
    const products = await this.productBidRepository.getAll();
    if (!products.length) {
      throw new AppError("Product not found", 404);
    }
    return products;
  }

  public async updateProductBidById(details: IUpdateProductBid): Promise<IProductBidResponse> {
    const { id, ...updates } = details;
    const update_response = await this.productBidRepository.updateById(details);
    if (!update_response) {
      throw new AppError("Could not update Product.", 400);
    }
    const product = await this.getProductBidById(id);
    return product;
  }

  public async deleteProductBidById(id: string): Promise<string> {
    const response = await this.productBidRepository.deleteById(id);
    if (!response) throw new AppError("Could not delete Product.", 400);
    return "Product Category successfully deleted";
  }
}
