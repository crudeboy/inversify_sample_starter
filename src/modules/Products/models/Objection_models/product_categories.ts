import { Db } from "../../../../shared/helpers/dbTables";
import Model from "../../../../shared/knex/objectionConnection";
import { getUUID } from "../../../../shared/utils/util-service";

export class ProductCategories extends Model() {
  static tableName = Db.getTables().productCategoriesTable;

  static selectColumns = ["name", "id", "slug", "description"];

  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;

  $beforeInsert(context: any) {
    this.id = getUUID();
  }
}
