import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table('user_module.users', function (table) {
    table.bigint('otp_expires_at');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table('user_module.users', function (table) {
    table.dropColumn('otp_expires_at');
  });
}
