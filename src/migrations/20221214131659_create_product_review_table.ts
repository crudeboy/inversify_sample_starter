import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.transaction((transaction) => {
    return transaction.schema.raw("CREATE SCHEMA IF NOT EXISTS " + "product_module" + ";").then(() => {
      return transaction.schema
        .hasTable("product_review")
        .then(function (exists) {
          if (!exists) {
            return transaction.schema.withSchema("product_module").createTable("product_review", (table) => {
              table.uuid("id").primary();
              table.uuid("reviewer_id");
              table.enu("review_result", ["accepted", "rejected"]).notNullable();
              table.text("review").notNullable();

              table.timestamps(true, true);

              table.foreign("reviewer_id").references("id").inTable("user_module.users");
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
  return knex.schema.withSchema("product_module").dropTableIfExists("product_review");
}
