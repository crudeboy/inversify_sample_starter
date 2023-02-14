import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.transaction((transaction) => {
    return transaction.schema.raw("CREATE SCHEMA IF NOT EXISTS " + "product_module" + ";").then(() => {
      return transaction.schema
        .hasTable("products_buy")
        .then(function (exists) {
          if (!exists) {
            return transaction.schema.withSchema("product_module").createTable("products_buy", (table) => {
              table.uuid("id").primary();
              table.uuid("productId").notNullable();
              table.string("price").notNullable();

              table.foreign("productId").references("id").inTable("product_module.product");
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
  return knex.schema.withSchema("product_module").dropTableIfExists("products_buy");
}
