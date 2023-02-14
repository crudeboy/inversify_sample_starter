import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.table('product_module.product_review', function (table) {
    table.uuid('product_id');

    table.foreign('product_id').references('id').inTable('product_module.product');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.table('product_module.product_review', function (table) {
    table.dropColumn('product_id');
  });
}

