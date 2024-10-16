import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_permissions').del();

  // Get user and permission IDs from the database
  const user1 = await knex('users')
    .where({ username: 'usuario1' })
    .select('id')
    .first();
  const user2 = await knex('users')
    .where({ username: 'usuario2' })
    .select('id')
    .first();

  console.log(`Seeding for user: ${user1.id}`);

  // Ensure user IDs exist
  if (!user1 || !user2) {
    throw new Error('Users not found.');
  }

  const claroProvider = await knex('providers')
    .where({ name: 'Claro' })
    .select('id')
    .first();
  const tigoProvider = await knex('providers')
    .where({ name: 'Tigo' })
    .select('id')
    .first();

  // Ensure provider IDs exist
  if (!claroProvider || !tigoProvider) {
    throw new Error('Providers not found.');
  }

  const claroCallPermission = await knex('permissions')
    .where({ name: 'Contacto por Whatsapp', provider_id: claroProvider.id })
    .select('id')
    .first();
  const tigoMessagePermission = await knex('permissions')
    .where({ name: 'Contacto por Whatsapp', provider_id: tigoProvider.id })
    .select('id')
    .first();

  // Ensure permission IDs exist
  if (!claroCallPermission || !tigoMessagePermission) {
    throw new Error('Permissions not found.');
  }

  // Inserts seed entries for user permissions
  return knex('user_permissions').insert([
    {
      id: knex.raw('UUID()'),
      user_id: user1.id,
      permission_id: claroCallPermission.id,
      status: 'active',
      justification: null,
    },
    {
      id: knex.raw('UUID()'),
      user_id: user2.id,
      permission_id: tigoMessagePermission.id,
      status: 'active',
      justification: null,
    },
  ]);
}
