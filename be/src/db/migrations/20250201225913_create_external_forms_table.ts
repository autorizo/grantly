import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('external_forms', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.enu('platform', ['tally', 'typeform', 'google_forms']).notNullable();
    table.string('external_form_id').unique().notNullable();
    table.string('name').notNullable();
    table.text('url').notNullable();
    table.string('auth_token');
    table.integer('points_reward').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('external_forms');
}
