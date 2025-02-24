import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tickets', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.string('name').notNullable();
    table.integer('cost_in_points').notNullable();
    table
      .enu('type', ['discount', 'event', 'membership'])
      .notNullable()
      .defaultTo('discount');
    table.decimal('value', 10, 2).notNullable();
    table.enu('value_type', ['fixed', 'percentage']).nullable();
    table.integer('expiration_days').defaultTo(30).notNullable();
    table
      .uuid('category_id')
      .references('id')
      .inTable('ticket_categories')
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tickets');
}
