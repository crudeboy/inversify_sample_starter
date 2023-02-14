import AppError from "../../../shared/utils/AppError";
import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIERS from "@shared/constants/identifiers";
import ProductReviewsRepository from "../repositories/productReviews";
import { IProductReview, IProductReviewResponse, IUpdateProductReview } from "../interfaces/IProductReview";
import ProductService from "./Product.service";

@injectable()
export default class ProductReviewsService {
  @inject(SERVICE_IDENTIFIERS.PRODUCT_REVIEW_RESPOSITORY) private readonly productReviewsRepository: ProductReviewsRepository;
  @inject(SERVICE_IDENTIFIERS.PRODUCTS_SERVICE) private readonly productService: ProductService;

  public async createProductReview(detail: IProductReview): Promise<IProductReview> {
    const check_if_product_has_review =  await this.productReviewsRepository.checkIfProductreviewExist(detail.product_id)
    if(check_if_product_has_review){
      throw new AppError("Product already has a review use the re review route", 400);
    }
    const product_review = await this.productReviewsRepository.create(detail);

    //update the status on the product table
    await this.productService.updateProductById({id: detail.product_id, status: detail.review_result})
    return product_review;
  }

  public async getProductReviewById(id: string): Promise<IProductReviewResponse> {
    const product_review = await this.productReviewsRepository.getById(id);
    if (!product_review) {
      throw new AppError("Product review not found", 404);
    }
    return product_review;
  }

  public async getProductReviewByProductId(product_id: string): Promise<IProductReviewResponse> {
    const product_review = await this.productReviewsRepository.getByProductId(product_id);
    if (!product_review) {
      throw new AppError("Product review not found", 404);
    }
    return product_review;
  }

  public async getProductReviewByReviwerId(reviwer_id: string): Promise<IProductReviewResponse[]> {
    const product_reviews = await this.productReviewsRepository.getByReviewerId(reviwer_id);
    if (!product_reviews) {
      throw new AppError("Product review not found", 404);
    }
    return product_reviews;
  }

  public async getAllProductReviews(): Promise<IProductReviewResponse[]> {
    const product_categories = await this.productReviewsRepository.getAll();
    if (!product_categories.length) {
      throw new AppError("Product Category not found", 404);
    }
    return product_categories;
  }

  public async updateProductReviewById(details: IUpdateProductReview): Promise<IProductReviewResponse> {
    const check_if_product_has_review =  await this.productReviewsRepository.getByProductId(details.product_id)
    if(!check_if_product_has_review){
      throw new AppError("Productreview cannot be found", 400);
    }
    const update_response = await this.productReviewsRepository.updateById(details);
    if (!update_response) {
      throw new AppError("Could not update Product Category.", 400);
    }
    const product_review = await this.getProductReviewByProductId(details.product_id);
    return product_review;
  }

  public async deleteProductReviewById(id: string): Promise<string> {
    const response = await this.productReviewsRepository.deleteById(id);
    if (!response) throw new AppError("Could not delete Product Category.", 400);
    return "Product Category successfully deleted";
  }

  //by product id
  //by reviewer id
  //get accepted rejected
  //accpet or reject a product
}
