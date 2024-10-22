import knex from '@db/index';
import { AppError } from '@errors/index'; // Error handling utility

export const changeProviderStatus = async (providerId: string) => {
  const provider = await knex('providers').where('id', providerId).first();
  if (!provider) {
    throw new AppError(404, 'Not Found', ['Provider not found']);
  }
  const newStatus = provider.status === 'enabled' ? 'blocked' : 'enabled';
  await knex('providers').where('id', providerId).update({ status: newStatus }); // Update with the new toggled status
  return {
    message: 'Provider status toggled successfully',
    providerId,
    status: newStatus,
  };
};
