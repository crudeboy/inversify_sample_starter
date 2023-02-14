import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.transaction((transaction) => {
    return transaction.schema.raw('CREATE SCHEMA IF NOT EXISTS ' + 'user_module' + ';').then(() => {
      return transaction.schema
        .hasTable('user_token')
        .then(function (exists) {
          if (!exists) {
            return transaction.schema.withSchema('user_module').createTable('user_token', (table) => {
              table.uuid('id').primary();
              table.uuid('user_id').notNullable();
              table.string('password_reset_token');
              table.string('expires_at');

              table.foreign('user_id').references('id').inTable('user_module.users');
              table.timestamps(true, true);
            });
          }
          return null;
        })
        .catch((error) => {
          console.log('MIGRATION ERROR', error);
        });
    });
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.withSchema('user_module').dropTableIfExists('user_token');
}
