export const getImageUrl = (path) => {
    if (!path) return '';
    // Already a full URL
    if (path.startsWith('http')) return path;
    // Check if it's a storage path (contains 'storage/')
    if (path.includes('storage/')) return path;
    // Handle Laravel storage paths
    return `/storage/${path.replace(/^\/+/, '')}`;
};
