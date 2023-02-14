import { Db } from "../../../../shared/helpers/dbTables";
import Model from "../../../../shared/knex/objectionConnection";
import { getUUID } from "../../../../shared/utils/util-service";

export class Products_buy extends Model() {
  static tableName = Db.getTables().productsBuyTable;

  static selectColumns = ["id", "price"];

  id: string;
  productId: string;
  price: number;

  $beforeInsert(context: any) {
    this.id = getUUID();
  }
}
