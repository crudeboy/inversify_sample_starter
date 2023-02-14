import { Db } from "../../../../shared/helpers/dbTables";
import Model from "../../../../shared/knex/objectionConnection";
import { getUUID } from "../../../../shared/utils/util-service";

export class Users extends Model() {
  static tableName = Db.getTables().usersTable;

  static selectColumns = ["full_name", "id", "email"];

  id: string;
  full_name: string;
  password: string;
  address: string;
  country: string;
  profession: string;
  email: string;
  gender: string;
  is_email_verified: boolean;
  activated: boolean;
  is_deleted: boolean;
  payment_status: boolean;
  user_type: string;
  refree__user_id: string;
  user_role_id: number;
  otp: string;
  otp_expires_at: number;
  coupon: string;
  created_at: string;
  updated_at: string;

  $beforeInsert(context: any) {
    this.id = getUUID();
  }
}
