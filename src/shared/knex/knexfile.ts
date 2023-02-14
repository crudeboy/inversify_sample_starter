const path = require('path');
import environment from '../../config/environment';
import dotenv from 'dotenv';
dotenv.config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexConfiguration = {
  local: {
    client: 'postgresql',
    // connection: `mysql://root:${environment.default.dbPassword}@${environment.default.dbHost}:${environment.default.dbPort}/${environment.default.dbName}`,
    connection: {
      host: 'localhost',
      user: 'lakeman',
      port: 5433,
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, '../../old_migrations'),
      tableName: 'knex_migrations'
    }
  },

  development: {
    client: 'postgresql',
    connection: environment.DEV_DATABASE_URL ,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(__dirname, '../../migrations'),
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
  },

  production: {
    client: 'postgresql',
    connection: environment.PROD_DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
  }
};
// console.log(knexConfiguration, "knexConfiguration")

export const knexFileConfiguration = knexConfiguration;
module.exports = { ...knexConfiguration };
module.exports.knexFileConfiguration = { ...knexConfiguration };
