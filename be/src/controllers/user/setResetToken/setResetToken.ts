import knex from '@db/index';

export const setResetToken = async (userId: string, token: string) => {
  try {
    await knex('users')
      .where('id', userId)
      .update('reset_password_token', token);
  } catch (error) {
    throw error;
  }
};
