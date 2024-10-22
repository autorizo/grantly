import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('providers').del();

  // Inserts seed entries for providers
  await knex('providers').insert([
    {
      id: uuidv4(), // Generate a UUID using the uuid library
      name: 'Claro',
      description:
        'Proveedor de telecomunicaciones con servicios móviles y de cable.',
    },
    {
      id: uuidv4(),
      name: 'Tigo',
      description:
        'Proveedor de telecomunicaciones con servicios de internet y cable.',
    },
    {
      id: uuidv4(),
      name: 'Bancolombia',
      description: 'Banco que ofrece servicios financieros integrales.',
    },
    {
      id: uuidv4(),
      name: 'Davivienda',
      description: 'Banco enfocado en soluciones digitales e innovadoras.',
    },
  ]);
}
