import AppError from "../../../shared/utils/AppError";
import { inject, injectable } from "inversify";
import { REPOSITORIES } from "@shared/constants/identifiers";
import ProductBuyRepository from "../repositories/productBuy.repositories";
import { ICreateProductBuy, IProductBuy, IProductBuyResponse, IUpdateProductBuy } from "../interfaces/IProductBuy";

@injectable()
export default class ProductBuyService {
  @inject(REPOSITORIES.PRODUCTS_BUY_RESPOSITORY) private readonly productBuyRepository: ProductBuyRepository;

  public async createProductBuy(details: IProductBuy): Promise<ICreateProductBuy> {
    const product = await this.productBuyRepository.create(details);
    return product;
  }

  public async getProductBuyById(id: string): Promise<IProductBuyResponse> {
    const product = await this.productBuyRepository.getById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }

  public async getAllProductBuy(): Promise<IProductBuyResponse[]> {
    const products = await this.productBuyRepository.getAll();
    if (!products.length) {
      throw new AppError("Product not found", 404);
    }
    return products;
  }

  public async updateProductBuyById(details: IUpdateProductBuy): Promise<IProductBuyResponse> {
    const { id, ...updates } = details;
    const update_response = await this.productBuyRepository.updateById(details);
    if (!update_response) {
      throw new AppError("Could not update Product.", 400);
    }
    const product = await this.getProductBuyById(id);
    return product;
  }

  public async deleteProductBuyById(id: string): Promise<string> {
    const response = await this.productBuyRepository.deleteById(id);
    if (!response) throw new AppError("Could not delete Product.", 400);
    return "Product Category successfully deleted";
  }
}
