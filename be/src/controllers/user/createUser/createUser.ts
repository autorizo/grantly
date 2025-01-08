import knex from '@db/index';

export const createUser = async ({
  email,
  photo,
  phone,
  phoneCountryCode,
  first_name,
  last_name,
}: {
  email: string;
  photo?: string;
  phone?: string;
  phoneCountryCode?: string;
  first_name?: string;
  last_name?: string;
}) => {
  try {
    // Insert user into the database with all relevant fields
    await knex('users').insert({
      email,
      username: email,
      photo,
      phone,
      phone_country_code: phoneCountryCode,
      first_name: first_name,
      last_name: last_name,
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
