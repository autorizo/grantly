import knex from '@db/index';

export const updateUserData = async (userId: string, userData: any) =>
    await knex('users').where('id', userId).update(userData);
