import knex from 'knex';

// Encrypt password and update user password
export const setResetToken = async (userId: string, token: string) => {
  try {
    const result = await knex('users')
      .where('id', userId)
      .update('reset_password_token', token);

    // Log how many rows were affected
    console.log(`Rows updated: ${result}`);

    return result; // Returning the result (optional)
  } catch (error) {
    console.error('Error updating reset password token:', error);
    throw error; // Rethrow the error for further handling
  }
};
