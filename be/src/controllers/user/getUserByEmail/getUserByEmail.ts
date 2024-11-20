import knex from '@db/index';
import { AppError } from '@errors/index'; // Error handling utility

export const getUserByEmail = async (email: string) =>
  await knex('users').where('email', email).first();
