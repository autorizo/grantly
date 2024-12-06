import knex from '@db/index';

export const getUserByToken = async (token: string) =>
  await knex('users').where('reset_password_token', token).first();
