import { Db } from "../../../../shared/helpers/dbTables";
import Model from "../../../../shared/knex/objectionConnection";
import { getUUID } from "../../../../shared/utils/util-service";

export class Creatives extends Model() {
  static tableName = Db.getTables().creativesTable;

  static selectColumns = ["user_id", "id", "revenue", "franchisee_id"];

  id: string;
  user_id: string;
  franchisee_id: string;
  revenue: string;
  created_at: string;
  updated_at: string;

  $beforeInsert(context: any) {
    this.id = getUUID();
  }
}
