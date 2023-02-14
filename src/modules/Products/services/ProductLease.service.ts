import AppError from "../../../shared/utils/AppError";
import { inject, injectable } from "inversify";
import { REPOSITORIES } from "@shared/constants/identifiers";
import ProductLeaseRepository from "../repositories/productLease.repositories";
import { ICreateProductLease, IProductLease, IProductLeaseResponse, IUpdateProductLease } from "../interfaces/IProductLease";

@injectable()
export default class ProductLeaseService {
  @inject(REPOSITORIES.PRODUCTS_LEASE_RESPOSITORY) private readonly productLeaseRepository: ProductLeaseRepository;

  public async createProductLease(details: IProductLease): Promise<ICreateProductLease> {
    const product = await this.productLeaseRepository.create(details);
    return product;
  }

  public async getProductLeaseById(id: string): Promise<IProductLeaseResponse> {
    const product = await this.productLeaseRepository.getById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }

  public async getAllProductLease(): Promise<IProductLeaseResponse[]> {
    const products = await this.productLeaseRepository.getAll();
    if (!products.length) {
      throw new AppError("Product not found", 404);
    }
    return products;
  }

  public async updateProductLeaseById(details: IUpdateProductLease): Promise<IProductLeaseResponse> {
    const { id, ...updates } = details;
    const update_response = await this.productLeaseRepository.updateById(details);
    if (!update_response) {
      throw new AppError("Could not update Product.", 400);
    }
    const product = await this.getProductLeaseById(id);
    return product;
  }

  public async deleteProductLeaseById(id: string): Promise<string> {
    const response = await this.productLeaseRepository.deleteById(id);
    if (!response) throw new AppError("Could not delete Product.", 400);
    return "Product Category successfully deleted";
  }
}
