import { Db } from "../../../../shared/helpers/dbTables";
import Model from "../../../../shared/knex/objectionConnection";
import { getUUID } from "../../../../shared/utils/util-service";

export class Clients extends Model() {
  static tableName = Db.getTables().clientsTable;

  static selectColumns = ["user_id", "id", "revenue"];

  id: string;
  user_id: string;
  revenue: string;
  created_at: string;
  updated_at: string;

  $beforeInsert(context: any) {
    this.id = getUUID();
  }
}
