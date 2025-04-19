// resources/js/Pages/posts/index.jsx
import ActionsDropdown from '@/components/ActionsDropdown';
import ListingPage from '@/components/ListingPage';
import { createActionsColumn, createColumn, createDateColumn, createTagsColumn } from '@/utils/tableUtils';
import { Link, usePage } from '@inertiajs/react';

export default function PostsIndex() {
    const { posts, filters = {}, auth } = usePage().props;

    const breadcrumbs = [
        {
            title: 'posts',
            href: '/posts',
        },
    ];

    // Define custom actions renderer

    const columns = [
        createColumn('title', 'Title', (row) => (
            <div className="font-medium">
                <Link href={route('posts.show', row.original.id)} className="hover:underline">
                    {row.original.title}
                </Link>
            </div>
        )),
        createTagsColumn('tags', 'Tags'),
        createDateColumn('created_at', 'Created'),
        createActionsColumn((row) => (
            <ActionsDropdown
                item={row.original}
                routes={{
                    view: (id) => route('posts.show', id),
                    edit: (id) => route('posts.edit', id),
                    delete: (id) => route('posts.destroy', id),
                }}
            />
        )),
    ];


    return (
        <ListingPage
            title="Posts"
            data={posts}
            filters={filters}
            currentUser={auth.user}
            resourceName="posts"
            breadcrumbs={breadcrumbs}
            columns={columns} // Pass columns as a prop
            createButtonText="New Post"
        />
    );
}
