import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('permissions', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table
      .uuid('provider_id')
      .references('id')
      .inTable('providers')
      .onDelete('CASCADE');
    table.string('name').notNullable();
    table.integer('points').notNullable();
    table.text('description').notNullable();
    table.string('image');
    table.string('pdf_path').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('permissions');
}
