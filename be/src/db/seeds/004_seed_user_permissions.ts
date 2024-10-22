import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid'; // Importing the uuid library

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_permissions').del();

  // Get user and permission IDs from the database
  const user1 = await knex('users')
    .where({ username: 'usuario1' })
    .select('id')
    .first();
  console.log({ user1 });

  // Ensure user IDs exist
  if (!user1) {
    throw new Error('User not found.');
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

  // Ensure permission IDs exist
  if (!claroCallPermission) {
    throw new Error('Permissions not found.');
  }

  // Inserts seed entries for user permissions
  await knex('user_permissions').insert([
    {
      id: uuidv4(), // Generate a UUID using the uuid library
      user_id: user1.id,
      permission_id: claroCallPermission.id,
      status: 'active',
    },
  ]);
}
