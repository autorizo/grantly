import knex from '@db/index'; // Ensure you have your Knex instance imported
import { AppError } from '@errors/index'; // Error handling utility
import dayjs from 'dayjs'; // For handling timestamps

// Update or insert a specific state for a user's permission
export const updatePermissionState = async (
  userId: string,
  permissionId: string,
  state: 'active' | 'inactive'
) => {
  try {
    // Validate input
    if (!userId || !permissionId || !state) {
      throw new AppError(400, 'Validation Error', [
        'User ID, Permission ID, and State are required',
      ]);
    }

    // Check if the permission log already exists for the user and permission
    const existingLog = await knex('user_permissions')
      .where({ user_id: userId, permission_id: permissionId })
      .first();

    if (existingLog) {
      // Update the existing log
      await knex('user_permissions')
        .where('id', existingLog.id)
        .update({
          status: state,
          updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'), // Update timestamp
        });

      return {
        userId,
        permissionId,
        status: state,
        message: 'Permission log updated successfully',
      };
    } else {
      // Insert a new permission log
      const newLogEntry = {
        user_id: userId,
        permission_id: permissionId,
        status: state,
        created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'), // Record the current timestamp
      };

      await knex('user_permissions').insert(newLogEntry);

      return {
        userId,
        permissionId,
        status: state,
        message: 'Permission log inserted successfully',
      };
    }
  } catch (error) {
    console.error('Error logging permission state:', error);
    throw error; // Propagate the error for handling elsewhere
  }
};
