import knex from '@db/index';

export const getUserPermissions = async (userId: string) => {
  try {
    // Check if the user exists
    const user = await knex('users').where('id', userId).first();

    if (!user) {
      throw new Error(`User not found.`);
    }

    // Query to fetch providers with permissions, joined with user_permissions
    const providersWithPermissions = await knex('providers')
      .select(
        'providers.id as provider_id',
        'providers.name as provider_name',
        'providers.description as provider_description',
        'permissions.id as permission_id',
        'permissions.name as permission_name',
        'permissions.points as permission_points',
        'permissions.description as permission_description',
        'permissions.image as permission_image',
        'permissions.pdf_path as permission_pdf_path',
        'latest.created_at as permission_created_at',
        knex.raw("COALESCE(latest.status, 'inactive') as status"),

        knex.raw('latest.justification')
      )
      .leftJoin('permissions', 'providers.id', 'permissions.provider_id')
      .leftJoin(
        knex('user_permissions as up')
          .select(
            'up.permission_id',
            'up.status',
            'up.justification',
            'up.created_at'
          )
          .innerJoin(
            knex('user_permissions')
              .select('permission_id')
              .where('user_id', userId)
              .groupBy('permission_id')
              .max('created_at as max_created_at')
              .as('latest'),
            function () {
              this.on('up.permission_id', '=', 'latest.permission_id').andOn(
                'up.created_at',
                '=',
                'latest.max_created_at'
              );
            }
          )
          .as('latest'),
        'permissions.id',
        'latest.permission_id'
      )
      .orderBy('providers.name', 'asc');

    // Structure the data by grouping permissions under each provider
    const providersMap: { [key: string]: any } = {};
    providersWithPermissions.forEach((row) => {
      const providerId = row.provider_id;

      // If the provider is not already in the map, add it
      if (!providersMap[providerId]) {
        providersMap[providerId] = {
          id: providerId,
          name: row.provider_name,
          description: row.provider_description,
          total: 0, // This will be calculated dynamically below
          permissions: [],
        };
      }

      // Add the permission to the provider's permissions array
      providersMap[providerId].permissions.push({
        id: row.permission_id,
        name: row.permission_name,
        points: row.permission_points,
        description: row.permission_description,
        image: row.permission_image,
        pdfPath: row.permission_pdf_path,
        status: row.status, // Include latest status
        justification: row.justification || null, // Include justification or null if not available
        createdAt: row.permission_created_at, // Set to null if no matching entry in user_permissions
      });

      // Calculate the total points for the provider's enabled permissions
      if (row.status === 'active') {
        providersMap[providerId].total += row.permission_points;
      }
    });

    // Convert providersMap to an array
    const providersArray = Object.values(providersMap);
    // split inactive providers those with all permissions as 'inactive'
    const inactive = providersArray.filter((provider: any) =>
      provider.permissions.every(
        (permission: any) => permission.status === 'inactive'
      )
    );
    const active = providersArray.filter((provider: any) =>
      provider.permissions.some(
        (permission: any) =>
          permission.status === 'active' ||
          permission.status === 'blocked' ||
          permission.status === 'disabled'
      )
    );

    return { active, inactive };
  } catch (error) {
    console.error('Error fetching permissions:', error);
    throw error;
  }
};
// get last 20 permissions log with permission name and provider name
export const getUserPermissionsLog = async (userId: string) => {
  try {
    // Check if the user exists
    const user = await knex('users').where('id', userId).first();

    if (!user) {
      throw new Error(`User not found.`);
    }

    // Query to fetch providers with permissions, joined with user_permissions
    const permissionsLog = await knex('user_permissions')
      .select(
        'providers.name as provider_name',
        'permissions.name as permission_name',
        'permissions.points as permission_points',
        'user_permissions.status as status',
        'user_permissions.justification as justification',
        'user_permissions.created_at as created_at'
      )
      .innerJoin(
        'permissions',
        'user_permissions.permission_id',
        'permissions.id'
      )
      .innerJoin('providers', 'permissions.provider_id', 'providers.id')
      .where('user_permissions.user_id', userId)
      .orderBy('user_permissions.created_at', 'desc')
      .limit(20);

    return permissionsLog;
  } catch (error) {
    console.error('Error fetching permissions log:', error);
    throw error;
  }
};
