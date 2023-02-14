import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table('user_module.users', function (table) {
    table.string('otp').alter();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table('user_module.users', function (table) {
    table.integer('otp').alter();
  });
}
