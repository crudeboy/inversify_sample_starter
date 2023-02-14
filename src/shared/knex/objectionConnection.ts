import knex from "knex";
import { Model } from "objection";
import { knexFileConfiguration } from "./knexfile";
import env from "../../config/environment";

let environ = env.environment || "development";

export default () => {
  let config: any;
  let pg: any;
  if (environ === "production") {
    config = knexFileConfiguration.production;
  } else if (environ === "development") {
    config = knexFileConfiguration.development;
  } else if (environ === "local") {
    config = knexFileConfiguration.local;
  }

  pg = knex(config);
  Model.knex(pg);
  return Model;
};
