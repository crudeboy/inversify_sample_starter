import { Db } from "../../../../shared/helpers/dbTables";
import Model from "../../../../shared/knex/objectionConnection";
import { getUUID } from "../../../../shared/utils/util-service";

export class UserToken extends Model() {
  static tableName = Db.getTables().usersTokenTable;

  static selectColumns = ["full_name", "id", "email"];

  id: string;
  user_id: string;
  password_reset_token: string;
  expires_at: string;
  created_at: string;
  updated_at: string;

  $beforeInsert(context: any) {
    this.id = getUUID();
  }
}