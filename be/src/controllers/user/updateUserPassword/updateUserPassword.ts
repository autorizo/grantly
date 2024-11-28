import knex from '@db/index';
import bcrypt from 'bcryptjs';

// encrypt password and update user password
export const updateUserPassword = (userId: string, password: string) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return knex('users').where('id', userId).update({ password: hashedPassword });
};
