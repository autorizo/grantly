import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('username').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').nullable();
    table.string('photo').nullable();
    table.string('sub').nullable();
    table.string('oauth_provider').nullable();
    table.text('reset_password_token').nullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
