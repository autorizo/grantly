import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('points_transactions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.enu('type', ['earned', 'redeemed']).notNullable();
    table.integer('points').notNullable();
    table
      .enu('source', [
        'form_response',
        'manual',
        'referral',
        'purchase',
        'ticket_redemption',
      ])
      .notNullable();
    table.string('source_id').nullable();

    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['user_id', 'source']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('points_transactions');
}
