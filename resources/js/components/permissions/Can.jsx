import { usePage } from '@inertiajs/react';

export default function Can({ children, permission, role, any = false }) {
    const { auth } = usePage().props;

    // If no permission or role is required, show the content
    if (!permission && !role) {
        return children;
    }

    // Check if user is authenticated
    if (!auth.user) {
        return null;
    }

    // Check if user has the permission
    if (permission) {
        if (Array.isArray(permission)) {
            const hasPermission = any ? permission.some((p) => auth.permissions.includes(p)) : permission.every((p) => auth.permissions.includes(p));
            if (!hasPermission) return null;
        } else {
            if (!auth.permissions.includes(permission)) return null;
        }
    }

    // Check if user has the role
    if (role) {
        if (Array.isArray(role)) {
            const hasRole = any ? role.some((r) => auth.roles.includes(r)) : role.every((r) => auth.roles.includes(r));
            if (!hasRole) return null;
        } else {
            if (!auth.roles.includes(role)) return null;
        }
    }

    return children;
}
