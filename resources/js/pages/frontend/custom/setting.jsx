import React from 'react';
import EmployeeDashboardLayout from '../../../layouts/employeeDashboardLayout/EmployeeDashboardLayout';
import AccountSettings from './AccountSettings';

const setting = () => {
    return (
        <>
        <EmployeeDashboardLayout>
            <AccountSettings/>
        </EmployeeDashboardLayout>
        </>
    );
};

export default setting;