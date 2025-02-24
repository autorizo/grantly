import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('tickets').del();

  const [discountCategory] = await knex('ticket_categories')
    .select('id')
    .where('name', 'Descuentos');

  await knex('tickets').insert([
    {
      id: knex.raw('UUID()'),
      name: 'Descuento del 10%',
      cost_in_points: 100,
      type: 'discount',
      value: 10,
      value_type: 'percentage',
      expiration_days: 30,
      category_id: discountCategory?.id || null,
    },
    {
      id: knex.raw('UUID()'),
      name: 'Entrada a evento VIP',
      cost_in_points: 500,
      type: 'event',
      value: 50,
      value_type: 'fixed',
      expiration_days: 60,
      category_id: discountCategory?.id || null,
    },
  ]);
}
