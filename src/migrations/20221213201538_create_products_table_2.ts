import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.transaction((transaction) => {
    return transaction.schema.raw("CREATE SCHEMA IF NOT EXISTS " + "product_module" + ";").then(() => {
      return transaction.schema
        .hasTable("product")
        .then(function (exists) {
          if (!exists) {
            return transaction.schema.withSchema("product_module").createTable("product", (table) => {
              table.uuid("id").primary();
              table.string("name").notNullable();
              table.uuid("userId")
              table.string("description").notNullable();

              table.timestamps(true, true);

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
  return knex.schema.withSchema("product_module").dropTableIfExists("product");
}

