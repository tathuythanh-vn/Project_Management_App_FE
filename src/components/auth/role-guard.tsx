'use client'

import {useAuth} from "@/context/auth-context";
import {Role} from "@/model/auth";
import {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import ErrorPage from "@/components/error/error-page";
import LoadingSpinner from "@/components/loading/loading-spinner";
import LoadingScreen from "@/app/loading";


interface RoleGuardProps {
    children: ReactNode;
    roles: Role[] | null;
}

const RoleGuard = ({roles, children}: RoleGuardProps) => {
    const router = useRouter();
    const {user, isAuthenticated, isLoading} = useAuth();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    const [hasTimeOut, setHasTimeOut] = useState<boolean>(false);

    useEffect(() => {
        if (isLoading) {
            setHasTimeOut(false);

            const timer = setTimeout(() => {
                setHasTimeOut(true);
            }, 5000); // 5 seconds

            return () => clearTimeout(timer); // Cleanup on unmounted or state change
        }
    }, [isLoading]);

    useEffect(() => {
        function checkRoles() {
            // Still loading auth data - wait
            if (isLoading) {
                setIsAuthorized(null);
                return;
            }

            let userRole: Role | null = null;

            if (user) {
                userRole = user.userRole
            }

            // Check authorization
            if (roles) {
                if (userRole && roles.includes(userRole)) {
                    setIsAuthorized(true);
                    return;
                } else {
                    setIsAuthorized(false);
                    alert('You are not authorized to view this page');
                    router.push('/login');
                    return;
                }
            }

            setIsAuthorized(true);
        }


        checkRoles();
    }, [isLoading, roles, router])

    if (hasTimeOut) {
        return <ErrorPage/>
    }

    if (isLoading || isAuthorized === null || isAuthorized === false) {
        return <LoadingScreen/>;
    }

    return (
        <>
            {children}
        </>
    );
};

export default RoleGuard;
