import knex from '@db/index';

export const getUserByEmail = async (email: string) =>
  await knex('users').where('email', email).first();
