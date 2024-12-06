import knex from '@db/index';

export const createUser = async ({
  email,
  username,
  photo,
  phone,
  phoneCountryCode,
  firstName,
  lastName,
}: {
  email: string;
  username: string;
  photo?: string;
  phone?: string;
  phoneCountryCode?: string;
  firstName?: string;
  lastName?: string;
}) => {
  try {
    // Insert user into the database with all relevant fields
    await knex('users').insert({
      email,
      username,
      photo,
      phone,
      phone_country_code: phoneCountryCode,
      first_name: firstName,
      last_name: lastName,
    });

    // Retrieve the user from the database
    const user = await knex('users')
      .select(
        'id',
        'email',
        'username',
        'photo',
        'phone',
        'phone_country_code',
        'first_name',
        'last_name'
      )
      .where({ email })
      .first();

    return user;
  } catch (error) {
    throw error;
  }
};
