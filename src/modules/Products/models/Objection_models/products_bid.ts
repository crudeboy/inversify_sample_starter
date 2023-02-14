import { Db } from "../../../../shared/helpers/dbTables";
import Model from "../../../../shared/knex/objectionConnection";
import { getUUID } from "../../../../shared/utils/util-service";

export class Products_bid extends Model() {
  static tableName = Db.getTables().productsBidTable;

  static selectColumns = ["id", "price", "productId"];

  id: string;
  productId: string;
  price: number;
  duration: string;

  $beforeInsert(context: any) {
    this.id = getUUID();
  }
}
