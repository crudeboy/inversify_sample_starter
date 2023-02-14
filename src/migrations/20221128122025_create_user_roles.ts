import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.transaction((transaction) => {
    return transaction.schema.raw('CREATE SCHEMA IF NOT EXISTS ' + 'user_module' + ';').then(() => {
      return transaction.schema
        .hasTable('user_roles')
        .then(function (exists) {
          if (!exists) {
            return transaction.schema.withSchema('user_module').createTable('user_roles', (table) => {
              table.uuid('id').primary();
              table.string('name').notNullable();
              table.string('label').notNullable();
              table.text('description').notNullable();
     
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
  return knex.schema.withSchema('user_module').dropTableIfExists('user_roles');
}