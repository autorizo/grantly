import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('providers').del();

  // Inserts seed entries for providers
  return knex('providers').insert([
    {
      id: knex.raw('UUID()'),
      name: 'Claro',
      description: 'Proveedor de telecomunicaciones con servicios móviles y de cable.',
    },
    {
      id: knex.raw('UUID()'),
      name: 'Tigo',
      description: 'Proveedor de telecomunicaciones con servicios de internet y cable.',
    },
    {
      id: knex.raw('UUID()'),
      name: 'Bancolombia',
      description: 'Banco que ofrece servicios financieros integrales.',
    },
    {
      id: knex.raw('UUID()'),
      name: 'Davivienda',
      description: 'Banco enfocado en soluciones digitales e innovadoras.',
    },
  ]);
}
