import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table("user_module.user_roles", function (table) {
    table.integer("role_id").unique().alter();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table("user_module.user_roles", function (table) {
    table.integer("role_id").alter();
  });
}
