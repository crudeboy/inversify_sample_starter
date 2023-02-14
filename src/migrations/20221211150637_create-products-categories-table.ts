import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.transaction((transaction) => {
    return transaction.schema.raw("CREATE SCHEMA IF NOT EXISTS " + "product_module" + ";").then(() => {
      return transaction.schema
        .hasTable("product_categories")
        .then(function (exists) {
          if (!exists) {
            return transaction.schema.withSchema("product_module").createTable("product_categories", (table) => {
              table.uuid("id").primary();
              table.string("name").notNullable();
              table.string("slug").notNullable();
              table.string("description").notNullable();

              table.timestamps(true, true);
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
  return knex.schema.withSchema("product_module").dropTableIfExists("product_categories");
}
