import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table('user_module.users', function (table) {
    table.boolean('is_deleted').defaultTo('false');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table('user_module.users', function (table) {
    table.dropColumn('is_deleted');
  });
}
