import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries for users
  return knex('users').insert([
    {
      id: knex.raw('UUID()'),
      username: 'usuario1',
      email: 'usuario1@ejemplo.com',
    },
    {
      id: knex.raw('UUID()'),
      username: 'usuario2',
      email: 'usuario2@ejemplo.com',
    },
  ]);
}
