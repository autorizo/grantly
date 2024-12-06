import knex from '@db/index'; // Ensure you have your Knex instance imported
import { AppError } from '@errors/index'; // Error handling utility
import dayjs from 'dayjs'; // For handling timestamps

// Function to insert a notification
export const insertNotification = async (
  providerId: string | null, // The provider ID, can be null if not applicable
  permissionId: string | null, // The permission ID, can be null if not applicable
  userId: string | null, // The user ID, can be null if not applicable
  action:
    | 'active_permission'
    | 'block_provider'
    | 'inactive_permission'
    | 'unblock_provider',
  justification: string | null // Justification for the action, can be null
) => {
  try {
    const notificationEntry = {
      id: knex.raw('UUID()'), // Assuming you're using UUIDs for the notifications
      provider_id: providerId,
      permission_id: permissionId,
      user_id: userId, // Include the user_id
      justification: justification,
      action: action,
      created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'), // Current timestamp
    };

    // Insert the notification into the notifications table
    await knex('notifications').insert(notificationEntry);

    return {
      message: 'Notification inserted successfully',
      data: notificationEntry, // Return the inserted notification details
    };
  } catch (error) {
    console.error('Error inserting notification:', error);
    throw new AppError(500, 'Internal Server Error'); // Custom error handling
  }
};

// Function to fetch notifications for a user
export const getUserNotifications = async (userId: string) => {
  try {
    // Query to fetch notifications for the user
    const userNotifications = await knex('notifications')
      .select(
        'notifications.id as notification_id',
        'notifications.provider_id',
        'notifications.permission_id',
        'notifications.justification',
        'notifications.action',
        'notifications.created_at',
        'providers.name as provider_name',
        'permissions.name as permission_name',
        'permissions.points as permission_points',
        'pn.name as permission_provider_name'
      )
      .leftJoin('providers', 'notifications.provider_id', 'providers.id')
      .leftJoin('permissions', 'notifications.permission_id', 'permissions.id')
      .leftJoin('providers as pn', 'permissions.provider_id', 'pn.id')
      .where('notifications.user_id', userId)
      .orderBy('notifications.created_at', 'desc');

    const notifications = userNotifications.map((notification) => ({
      notification_id: notification.notification_id,
      provider_id: notification.provider_id,
      permission_id: notification.permission_id,
      justification: notification.justification,
      action: notification.action,
      created_at: notification.created_at,
      provider_name:
        notification.provider_name || notification.permission_provider_name,
      permission_name: notification.permission_name,
      permission_points: notification.permission_points,
    }));

    return notifications;
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    throw new AppError(500, 'Internal Server Error'); // Custom error handling
  }
};
