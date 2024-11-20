import knex from '@db/index';

export const createUserByOauth = async (
  email: string,
  username: string,
  sub: string,
  photo: string,
  oauthProvider: string
) => {
  try {
    // Insert user into the database
    await knex('users').insert({
      email,
      username,
      sub,
      photo,
      oauth_provider: oauthProvider,
    });
    // Retrieve the user from the database
    const user = await knex('users')
      .select('id', 'email', 'username', 'sub', 'photo', 'oauth_provider')
      .where({ email })
      .first();

    return user;
  } catch (error) {
    throw error;
  }
};
