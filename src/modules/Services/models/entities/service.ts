import { Db } from "../../../../shared/helpers/dbTables";
import Model from "../../../../shared/knex/objectionConnection";
import { getUUID } from "../../../../shared/utils/util-service";

export class Service extends Model() {
  static tableName = Db.getTables().serviceTable;

  static selectColumns = ["name", "id", "slug", "description"];

  id: string;
  name: string;
  sampleUrl: string;
  userId: string;
  categoryId: string;
  description: string;
  rate: string;
  status: string;
  created_at: string;
  updated_at: string;

  $beforeInsert(context: any) {
    this.id = getUUID();
  }
}
