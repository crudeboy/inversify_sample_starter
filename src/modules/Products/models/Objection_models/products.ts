import { Db } from "../../../../shared/helpers/dbTables";
import Model from "../../../../shared/knex/objectionConnection";
import { getUUID } from "../../../../shared/utils/util-service";

export class Products extends Model() {
  static tableName = Db.getTables().productsTable;

  static selectColumns = ["name", "id", "description", "price"];

  id: string;
  categoryId: string;
  userId: string;
  name: string;
  description: string;
  status: string;
  imageUrl: string;
  videoUrl: string;
  audioUrl: string;
  stockQuantity: number;
  created_at: string;
  updated_at: string;

  $beforeInsert(context: any) {
    this.id = getUUID();
  }
}
