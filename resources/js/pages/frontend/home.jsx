import React from 'react';
import { Head } from '@inertiajs/react'
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/components/frontend/home/hero.jsx';
import HowItWorks from '@/components/frontend/home/HowItWorks';
import BrowseCategories from '@/components/frontend/home/BrowseCategories';
import FeaturedGigs from '@/components/frontend/home/FeaturedGigs';
import CTA from '@/components/frontend/home/Cta';

export default function Home({ categories, users }) {
    return (
        <MainLayout>
            <Head title="Home" />
            <Hero categories={categories}/>
            <HowItWorks />
            <BrowseCategories categories={categories} />
            <FeaturedGigs />
            <CTA />
        </MainLayout>
    );
}
