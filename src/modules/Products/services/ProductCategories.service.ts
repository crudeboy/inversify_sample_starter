import AppError from "../../../shared/utils/AppError";
import { inject, injectable } from "inversify";
import { IProductCategory, IProductCategoryResponse, IUpdatProductCategory } from "../interfaces/IProductCategories";
import SERVICE_IDENTIFIERS from "@shared/constants/identifiers";
import ProductCategoryRepository from "../repositories/productCategories.repositories";

@injectable()
export default class ProductCategoryService {
  @inject(SERVICE_IDENTIFIERS.PRODUCT_CATEGORY_RESPOSITORY) private readonly productCategoryRepository: ProductCategoryRepository;

  public async create(detail: IProductCategory): Promise<IProductCategoryResponse> {
    const product_category = await this.productCategoryRepository.create(detail);
    return product_category;
  }

  public async getById(id: string): Promise<IProductCategoryResponse> {
    const product_category = await this.productCategoryRepository.getById(id);
    if (!product_category) {
      throw new AppError("Product Category not found", 404);
    }
    return product_category;
  }

  public async getAll(): Promise<IProductCategoryResponse[]> {
    const product_categories = await this.productCategoryRepository.getAll();
    if (!product_categories.length) {
      throw new AppError("Product Category not found", 404);
    }
    return product_categories;
  }

  public async updateProductCategoryById(details: IUpdatProductCategory): Promise<IProductCategoryResponse> {
    const { id, ...updates } = details;
    const update_response = await this.productCategoryRepository.updateById(details);
    if (!update_response) {
      throw new AppError("Could not update Product Category.", 400);
    }
    const product_category = await this.getById(id);
    return product_category;
  }

  public async deleteProductCategoryById(id: string): Promise<string> {
    const response = await this.productCategoryRepository.deleteById(id);
    if (!response) throw new AppError("Could not delete Product Category.", 400);
    return "Product Category successfully deleted";
  }
}
