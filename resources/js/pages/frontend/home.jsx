import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Hero from '@/components/frontend/home/hero.jsx';
import HowItWorks from '@/components/frontend/home/HowItWorks';
import CTA from '@/components/frontend/home/Cta';
import ProComponent from '../../components/frontend/home/ProComponent';

export default function Home({ categories, users, microTasks }) {
    return (
        <MainLayout>
            <Head title="Home" />
            <Hero />
            <HowItWorks />
            <div className="bg-gray-50 pt-5">
                <ProComponent className="mt-7"></ProComponent>
            </div>
            <CTA />
        </MainLayout>
    );
}
