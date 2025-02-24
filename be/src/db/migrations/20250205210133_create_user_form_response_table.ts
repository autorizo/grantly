import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_form_responses', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('form_id')
      .notNullable()
      .references('id')
      .inTable('external_forms')
      .onDelete('CASCADE');
    table.timestamp('responded_at').defaultTo(knex.fn.now());

    table.unique(['user_id', 'form_id']); // Evita respuestas duplicadas
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_form_responses');
}
