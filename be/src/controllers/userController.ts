import knex from '@db/index';

export const getUserPermissions = async (userId: string) => {
  try {
    // Check if the user exists
    const user = await knex('users').where('id', userId).first();

    if (!user) {
      throw new Error(`User not found.`);
    }

    // Query to fetch all permissions associated with providers
    const providersWithPermissions = await knex('providers')
      .select(
        'providers.id as provider_id',
        'providers.name as provider_name',
        'providers.description as provider_description',
        'providers.status as provider_status',
        'permissions.id as permission_id',
        'permissions.name as permission_name',
        'permissions.points as permission_points',
        'permissions.description as permission_description',
        'permissions.image as permission_image',
        'permissions.pdf_path as permission_pdf_path',
        'up.updated_at as updated_at',
        knex.raw("COALESCE(up.status, 'inactive') as status") // Default to 'inactive' if no entry found
      )
      .leftJoin('permissions', 'providers.id', 'permissions.provider_id')
      .leftJoin('user_permissions as up', function () {
        this.on('permissions.id', '=', 'up.permission_id').andOn(
          'up.user_id',
          '=',
          knex.raw('?', [userId])
        ); // Explicitly filter by the current user
      })
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
          status: row.provider_status,
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
        updatedAt: row.updated_at,
        status: row.status, // Include status, defaults to 'inactive'
      });

      // Calculate the total points for the provider's enabled permissions
      if (row.status === 'active') {
        providersMap[providerId].total += row.permission_points;
      }
    });

    // Convert providersMap to an array
    const providersArray = Object.values(providersMap);

    // Split inactive providers those with all permissions as 'inactive'
    const inactive = providersArray.filter((provider: any) =>
      provider.permissions.every(
        (permission: any) =>
          permission.status === 'inactive' && provider.status === 'enabled'
      )
    );
    const active = providersArray.filter(
      (provider: any) =>
        provider.permissions.some(
          (permission: any) => permission.status === 'active'
        ) && provider.status === 'enabled'
    );

    const blocked = providersArray.filter(
      (provider: any) => provider.status === 'blocked'
    );
    return { active, inactive, blocked };
  } catch (error) {
    console.error('Error fetching permissions:', error);
    throw error;
  }
};
