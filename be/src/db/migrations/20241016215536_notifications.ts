import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('notifications', function (table) {
    // Primary key
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));

    // Foreign key to providers table
    table
      .uuid('provider_id')
      .references('id')
      .inTable('providers')
      .onDelete('CASCADE')
      .nullable();

    // Foreign key to permissions table
    table
      .uuid('permission_id')
      .references('id')
      .inTable('permissions')
      .onDelete('CASCADE')
      .nullable();

    // Foreign key to users table
    table
      .uuid('user_id')
      .references('id')
      .inTable('users') // Ensure this references the correct table
      .onDelete('SET NULL') // Decide what happens on user delete
      .nullable(); // Allow it to be nullable if the notification is not user-related

    // Justification for the notification
    table.text('justification').nullable();

    // Action type
    table
      .enu('action', [
        'active_permission',
        'block_provider',
        'unblock_provider',
        'inactive_permission',
      ])
      .notNullable();

    // Creation timestamp
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('notifications');
}
