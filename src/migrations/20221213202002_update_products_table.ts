import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.table("product_module.product", function (table) {
        table.uuid("categoryId");
        table.enu("status", ["accepted", "rejected", "pending"]).defaultTo("pending");
        table.string("imageUrl");
        table.string("videoUrl");
        table.string("audioUrl");
        table.integer("stockQuantity");
        table.boolean("buy").defaultTo(false);
        table.boolean("lease").defaultTo(false);
        table.boolean("bid").defaultTo(false);

        table.foreign("categoryId").references("id").inTable("product_module.product_categories");
    });
  }

export async function down(knex: Knex): Promise<any> {
    return knex.schema.table('product_module.product', function (table) {
        table.dropColumn('categoryId');
        table.dropColumn('status');
        table.dropColumn('imageUrl');
        table.dropColumn('videoUrl');
        table.dropColumn('audioUrl');
        table.dropColumn('stockQuantity');
        table.dropColumn('buy');
        table.dropColumn('lease');
        table.dropColumn('bid');
      });
}
