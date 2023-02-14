import AppError from "../../../shared/utils/AppError";
import { injectable } from "inversify";
import { IProductCategory, IProductCategoryResponse, IUpdatProductCategory } from "../interfaces/IProductCategories";
import { ProductCategories } from "../models/Objection_models/product_categories";

@injectable()
export default class ProductCategoryRepository {
  public async create(detail: IProductCategory): Promise<IProductCategoryResponse> {
    const product_category = await ProductCategories.query().insert({ ...detail });
    return product_category;
  }

  public async getById(id: string): Promise<IProductCategoryResponse> {
    const product_category = await ProductCategories.query().findById(id);
    if (!product_category) {
      throw new AppError("Product Category not found", 404);
    }
    return product_category;
  }

  public async getAll(): Promise<IProductCategoryResponse[]> {
    const product_category = await ProductCategories.query()
    if (!product_category.length) {
      throw new AppError("Product Category not found", 404);
    }
    return product_category;
  }

  public async updateById(details: IUpdatProductCategory): Promise<number> {
    const { id, ...updates } = details;
    console.log(id, "id")
    const product_category = await ProductCategories.query()
      .findById(id)
      .patch({ ...updates });

    return product_category;
  }

  public async deleteById(id: string): Promise<number> {
    const response = await ProductCategories.query().deleteById(id);
    return response;
  }
}
