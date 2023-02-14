import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.transaction((transaction) => {
    return transaction.schema.raw("CREATE SCHEMA IF NOT EXISTS " + "product_module" + ";").then(() => {
      return transaction.schema
        .hasTable("products")
        .then(function (exists) {
          if (!exists) {
            return transaction.schema.withSchema("product_module").createTable("products", (table) => {
              table.uuid("id").primary();
              table.string("name")
              table.string("categoryId")
              table.string("userId")
              table.string("description");
              table.string("price")
              table.enu("status", ["accepted", "rejected", "pending"]).defaultTo("pending");
              table.string("imageUrl");
              table.string("videoUrl");
              table.string("audioUrl");
              table.string("stockQuantity")
              table.boolean("buy").defaultTo(false);
              table.boolean("lease").defaultTo(false);
              table.boolean("bid").defaultTo(false);
              table.timestamps(true, true)

              table.foreign("userId").references("id").inTable("user_module.users");
            });
          }
          return null;
        })
        .catch((error) => {
          console.log("MIGRATION ERROR", error);
        });
    });
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.withSchema("product_module").dropTableIfExists("products");
}
