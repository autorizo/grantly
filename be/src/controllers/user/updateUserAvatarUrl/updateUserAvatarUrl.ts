import knex from '@db/index';

export const updateUserAvatarUrl = async (userId: string, photo: string) =>
  await knex('users').where('id', userId).update({ photo });
