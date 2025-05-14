import React from 'react';
import EmployeeDashboardLayout from '@/Layouts/employeeDashboardLayout/EmployeeDashboardLayout';
import Jobs from './Jobs';

const EmployeeJobsList = () => {
  return (
    <EmployeeDashboardLayout>
      <Jobs/>
    </EmployeeDashboardLayout>
  );
};

export default EmployeeJobsList;