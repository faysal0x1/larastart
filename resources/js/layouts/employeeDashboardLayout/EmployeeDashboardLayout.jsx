import React from 'react';
import { EmployeeNavbar } from '@/components/frontend/employeeDashboard/EmployeeNavbar'
import Footer from '../../components/frontend/footer';

export default function EmployeeDashboardLayout({ children ,dp}) {
    return (
        <div className="min-h-screen bg-gray-50">
           <EmployeeNavbar dp={dp}></EmployeeNavbar>
            <main className="flex-grow">
                {children}
            </main>
            <Footer/>
            
        </div>
    );
}
