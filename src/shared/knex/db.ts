import knex from "knex";
import { knexFileConfiguration } from "./knexfile";
import environment from "../../config/environment";
// import environment from '../../config/environment';

console.log(environment, "environment from db.ts");
let db;
if (environment.environment === "production") {
  db = knex(knexFileConfiguration.production);
} else if (environment.environment === "development") {
  db = knex(knexFileConfiguration.development);
  console.log(db.client, "db");
} else {
  db = knex(knexFileConfiguration.local);
  console.log(db.client, "db");
}

module.exports = db;
