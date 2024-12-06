import knex from '@db/index';

export const createUserByOauth = async (
  email: string,
  username: string,
  sub: string,
  oauthProvider: string,
  photo?: string,
  phone?: string,
  phoneCountryCode?: string,
  firstName?: string,
  lastName?: string
) => {
  try {
    // Insert user into the database with all relevant fields
    await knex('users').insert({
      email,
      username,
      sub,
      photo,
      phone,
      phone_country_code: phoneCountryCode,
      first_name: firstName,
      last_name: lastName,
      oauth_provider: oauthProvider,
    });

    // Retrieve the user from the database
    const user = await knex('users')
      .select(
        'id',
        'email',
        'username',
        'sub',
        'photo',
        'phone',
        'phone_country_code',
        'first_name',
        'last_name',
        'oauth_provider'
      )
      .where({ email })
      .first();

    return user;
  } catch (error) {
    throw error;
  }
};
