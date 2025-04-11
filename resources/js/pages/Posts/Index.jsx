// resources/js/Pages/Posts/Index.jsx
import ListingPage from '@/components/ListingPage';
import { usePage } from '@inertiajs/react';

export default function PostsIndex() {
    const { posts, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'Posts',
            href: '/posts',
        },
    ];

    return (
        <ListingPage
            title="Posts"
            data={posts}
            filters={filters}
            currentUser={auth.user}
            resourceName="posts"
            breadcrumbs={breadcrumbs}
            showTags={true}
            createButtonText="New Post"
        />
    );
}
