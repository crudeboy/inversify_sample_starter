import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table('user_module.users', function (table) {
    table.integer('user_role_id');

    table.foreign('user_role_id').references('role_id').inTable('user_module.user_roles');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table('user_module.users', function (table) {
    table.dropColumn('user_role_id');
  });
}
