import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing notifications
  await knex('notifications').del();

  // Fetch provider and permission
  const claroProvider = await knex('providers')
    .where({ name: 'Claro' })
    .select('id')
    .first();

  const claroCallPermission = await knex('permissions')
    .where({ name: 'Contacto por Whatsapp', provider_id: claroProvider?.id })
    .select('id')
    .first();

  // Fetch or define a user ID (adjust the criteria as needed)
  const user = await knex('users')
    .where({ username: 'usuario1' })
    .select('id')
    .first();

  if (!claroProvider || !claroCallPermission || !user) {
    throw new Error('Providers, Permissions, or User not found.');
  }

  // Insert a notification with user_id
  await knex('notifications').insert({
    id: uuidv4(),
    provider_id: claroProvider.id,
    permission_id: claroCallPermission.id,
    user_id: user.id, // Include user_id
    justification: '',
    action: 'active_permission',
  });
}
