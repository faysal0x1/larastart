import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
// import MainLayout from '../../../../layouts/MainLayout';
import BlogPage from './BlogPage';

const BlogIndex = () => {
    return (
            <MainLayout>
                <BlogPage />
            </MainLayout>
    );
};

export default BlogIndex;