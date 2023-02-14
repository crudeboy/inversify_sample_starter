import { Knex } from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.transaction((transaction) => {
    return transaction.schema.raw('CREATE SCHEMA IF NOT EXISTS ' + 'user_module' + ';').then(() => {
      return transaction.schema
        .hasTable('users')
        .then(function (exists) {
          if (!exists) {
            return transaction.schema.withSchema('user_module').createTable('users', (table) => {
              table.uuid('id').primary();
              table.string('full_name');
              table.string('password');
              table.string('address');
              table.string('country');
              table.string('profession');
              table.string('email');
              table.enu('gender', ['male', 'female', "binary", "non-binary", "prefer-not-to-respoind"]);
              table.boolean('is_email_verified').defaultTo(false);
              table.boolean('activated').defaultTo(false);
              table.boolean('payment_status').defaultTo(false);
              table.string('user_type');
              table.uuid('refree__user_id');
              table.string('coupon');
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
  return knex.schema.withSchema('user_module').dropTableIfExists('users');
}



