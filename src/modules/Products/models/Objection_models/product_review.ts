import { Db } from "../../../../shared/helpers/dbTables";
import Model from "../../../../shared/knex/objectionConnection";
import { getUUID } from "../../../../shared/utils/util-service";

export class ProductReviews extends Model() {
  static tableName = Db.getTables().productsReviewTable;

  static selectColumns = ["review_result", "id", "", "review", "reviewer_id", "product_id"];

  id: string;
  review_result: string;
  review: string;
  reviewer_id: string;
  product_id: string;
  created_at: string;
  updated_at: string;

  $beforeInsert(context: any) {
    this.id = getUUID();
  }
}