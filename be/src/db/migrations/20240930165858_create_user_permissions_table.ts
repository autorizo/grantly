import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_permissions', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table
      .uuid('permission_id')
      .references('id')
      .inTable('permissions')
      .onDelete('CASCADE');
    table.enu('status', ['active', 'inactive']).defaultTo('active');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_permissions');
}
