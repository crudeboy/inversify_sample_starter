export interface IProductReview {
  product_id: string;
  reviewer_id: string;
  review_result: string;
  review: string;
}
export interface IProductReviewRequest {
  product_id: string;
  review_result: string;
  review: string;
}

export interface IUpdateProductReview {
  id?: string;
  reviewer_id?: string;
  product_id: string;
  review_result?: string;
  review?: string;
}

export interface IUpdateProductReviewRequest {
  review_result?: string;
  review?: string;
}

export interface IProductReviewResponse {
  id: string;
  reviewer_id: string;
  review_result: string;
  review: string;
}

export enum ProductReviewEnum {
  "ACCEPTED" = "accepted",
  "REJECTED" = "rejected",
}
