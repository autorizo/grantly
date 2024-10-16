"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPermissions = void 0;
const db_1 = __importDefault(require("../db"));
// Function to get user permissions and structure the data
const getUserPermissions = async (userId) => {
    // Fetch all providers for the user
    const providers = await (0, db_1.default)('providers')
        .select('providers.id', 'providers.name', 'providers.description')
        .distinct()
        .join('permissions', 'permissions.provider_id', '=', 'providers.id')
        .join('user_permissions', 'user_permissions.permission_id', '=', 'permissions.id')
        .where('user_permissions.user_id', userId);
    const results = [];
    // Iterate over providers and get their permissions
    for (const provider of providers) {
        const permissions = await (0, db_1.default)('permissions')
            .select('permissions.name', 'user_permissions.enabled', 'user_permissions.blocked', 'permissions.image', 'permissions.points', 'permissions.description', 'user_permissions.updated_at as lastUpdated')
            .join('user_permissions', 'permissions.id', '=', 'user_permissions.permission_id')
            .where('user_permissions.user_id', userId)
            .andWhere('permissions.provider_id', provider.id);
        results.push({
            name: provider.name,
            total: permissions.reduce((acc, perm) => acc + perm.points, 0), // Calculate total points
            description: provider.description,
            permissions: permissions.map(permission => ({
                name: permission.name,
                enabled: permission.enabled,
                blocked: permission.blocked,
                image: permission.image,
                points: permission.points,
                description: permission.description,
                lastUpdated: permission.lastUpdated,
            })),
        });
    }
    return results;
};
exports.getUserPermissions = getUserPermissions;
