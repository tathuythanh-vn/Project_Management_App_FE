import React from 'react';
import RoleGuard from "@/components/auth/role-guard";
import {Role} from "@/model/auth";

const AuthLayout = ({children}: { children: React.ReactNode }) => {
    return <main className="h-svh bg-stone-100 flex items-center justify-center">
        <RoleGuard roles={null}>
            {children}
        </RoleGuard>
    </main>
};

export default AuthLayout;