import knex from '@db/index';

export const getUserById = async (id: string) =>
  await knex('users')
    .select(
      'email',
      'username',
      'created_at',
      'updated_at',
      'photo',
      'oauth_provider'
    )
    .where('id', id)
    .first();
