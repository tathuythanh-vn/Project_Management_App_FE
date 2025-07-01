import React from 'react';
import UserManagementTable from "@/components/user-management/user-management-table/user-management-table";

const UserManagementPage = () => {
    return (
        <div>
            <h1 className='text-2xl font-semibold mb-6'>User Management</h1>
            <UserManagementTable />
        </div>
    );
};

export default UserManagementPage;
