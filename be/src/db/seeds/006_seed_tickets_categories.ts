import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('ticket_categories').del();

  await knex('ticket_categories').insert([
    { id: knex.raw('UUID()'), name: 'Descuentos' },
    { id: knex.raw('UUID()'), name: 'Eventos' },
    { id: knex.raw('UUID()'), name: 'Membresías' },
  ]);
}
