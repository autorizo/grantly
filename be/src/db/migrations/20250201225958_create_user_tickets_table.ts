import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_tickets', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('ticket_id')
      .notNullable()
      .references('id')
      .inTable('tickets')
      .onDelete('CASCADE');

    table.timestamp('redeemed_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('expires_at').notNullable();

    table
      .enu('status', ['active', 'used', 'expired'])
      .notNullable()
      .defaultTo('active');

    table.index(['user_id', 'ticket_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_tickets');
}
