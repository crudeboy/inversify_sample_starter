import AppError from "../../../shared/utils/AppError";
import { injectable } from "inversify";
import { ProductReviews } from "../models/Objection_models/product_review";
import { IProductReview, IProductReviewResponse, IUpdateProductReview } from "../interfaces/IProductReview";

@injectable()
export default class ProductReviewsRepository {
  public async create(detail: IProductReview): Promise<IProductReview> {
    const product_review = await ProductReviews.query().insert({ ...detail });
    return product_review;
  }

  public async getById(id: string): Promise<IProductReviewResponse> {
    const product_review = await ProductReviews.query().findById(id);
    if (!product_review) {
      throw new AppError("Product Review not found", 404);
    }
    return product_review;
  }

  public async getByProductId(product_id: string): Promise<IProductReviewResponse> {
    const product_review = await ProductReviews.query().findOne({product_id});
    if (!product_review) {
      throw new AppError("Product Review not found", 404);
    }
    return product_review;
  }

  public async checkIfProductreviewExist(product_id: string): Promise<Boolean> {
    const product_review = await ProductReviews.query().findOne({product_id});
    return product_review ? true : false;
  }

  public async getByReviewerId(reviewer_id: string): Promise<IProductReviewResponse[]> {
    const product_reviews = await ProductReviews.query().where({reviewer_id}) 
    if (!product_reviews) {
      throw new AppError("Product Review not found", 404);
    }
    return product_reviews;
  }

  public async getAllAcceptedProducts(reviewer_id: string): Promise<IProductReviewResponse[]> {
    const product_reviews = await ProductReviews.query().where({reviewer_status: "accepted"}) 
    if (!product_reviews) {
      throw new AppError("Product Review not found", 404);
    }
    return product_reviews;
  }

  public async getAllRejectedProducts(reviewer_id: string): Promise<IProductReviewResponse[]> {
    const product_reviews = await ProductReviews.query().where({reviewer_status: "rejected"}) 
    if (!product_reviews) {
      throw new AppError("Product Review not found", 404);
    }
    return product_reviews;
  }

  public async getAll(): Promise<IProductReviewResponse[]> {
    const product_reviews = await ProductReviews.query()
    if (!product_reviews.length) {
      throw new AppError("Product Category not found", 404);
    }
    return product_reviews;
  }

  public async updateById(details: IUpdateProductReview): Promise<number> {
    const { id, product_id, ...updates } = details;
    const product_category = await ProductReviews.query()
      .findOne({product_id})
      .patch({ ...updates });

    return product_category;
  }

  public async deleteById(id: string): Promise<number> {
    const response = await ProductReviews.query().deleteById(id);
    return response;
  }
}
