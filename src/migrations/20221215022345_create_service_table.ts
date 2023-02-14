import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.transaction((transaction) => {
    return transaction.schema.raw("CREATE SCHEMA IF NOT EXISTS " + "service_module" + ";").then(() => {
      return transaction.schema
        .hasTable("service")
        .then(function (exists) {
          if (!exists) {
            return transaction.schema.withSchema("service_module").createTable("service", (table) => {
              table.uuid("id").primary();
              table.string("name").notNullable();
              table.uuid("userId");
              table.uuid("categoryId");
              table.enu("status", ["accepted", "rejected", "pending"]).defaultTo("pending");
              table.string("description");
              table.string("rate");
              table.string("sampleUrl");
              table.timestamps(true, true);

              table.foreign("userId").references("id").inTable("user_module.users");
              table.foreign("categoryId").references("id").inTable("service_module.service_categories");
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
  return knex.schema.withSchema("service_module").dropTableIfExists("service");
}
