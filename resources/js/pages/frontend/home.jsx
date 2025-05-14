import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/components/frontend/home/hero.jsx';
import HowItWorks from '@/components/frontend/home/HowItWorks';
import BrowseCategories from '@/components/frontend/home/BrowseCategories';
import FeaturedGigs from '@/components/frontend/home/FeaturedGigs';
import CTA from '@/components/frontend/home/Cta';
import MicroJobTalent from '../../components/frontend/home/MicroJobTalent';
import ProComponent from '../../components/frontend/home/ProComponent';

export default function Home({ categories, users, microTasks }) {
    return (
        <MainLayout>
            <Head title="Home" />
            <Hero categories={categories} />
            <HowItWorks />
            <BrowseCategories categories={categories} />
            <FeaturedGigs microTasks={microTasks} />
            <div className="bg-gray-50 pt-5">
                <MicroJobTalent />
                <ProComponent className="mt-7"></ProComponent>
            </div>
            <CTA />
        </MainLayout>
    );
}
