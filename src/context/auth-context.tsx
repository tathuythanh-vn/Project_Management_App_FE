'use client'
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Role} from "@/model/auth";
import {notFound, useRouter} from "next/navigation";
import ErrorPage from "@/components/error/error-page";

type User = {
    userId: string;
    userRole: Role;
}

export interface AuthResult {
    success: boolean;
    error?: string;
}

interface AuthContextType {
    user: User | undefined;
    login: (email: string, password: string) => Promise<AuthResult>;
    logout: () => Promise<AuthResult>;
    register: (email: string, password: string, name: string) => Promise<AuthResult>;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error(
        'useAuth must be used within an AuthProvider'
    )
    return context;
}

const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        async function checkUserSession() {
            try {
                setIsLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                if (!response.ok) {
                    throw new Error('User not found');
                }

                const {user}: {
                    user: {
                        userId: string;
                        userRole: Role;
                    }
                } = await response.json();

                setUser(user);
            } catch (error) {
                setUser(undefined);
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        }

        checkUserSession();
    }, [])

    const login = async (email: string, password: string): Promise<AuthResult> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message)
            }

            const responseMe = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!responseMe.ok) {
                throw new Error(data.message)
            }

            const {user}: {
                user: {
                    userId: string;
                    userRole: Role;
                }
            } = await responseMe.json();

            setUser(user);
            return {
                success: true,
            }
        } catch (error) {
            console.error(error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            }
        }
    }

    const register = async (email: string, password: string, name: string): Promise<AuthResult> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password, name}),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message)
            }

            const responseMe = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!responseMe.ok) {
                throw new Error(data.message)
            }

            const {user}: {
                user: {
                    userId: string;
                    userRole: Role;
                }
            } = await responseMe.json();

            setUser(user);

            return {
                success: true,
            }
        } catch (error) {
            console.error(error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'An unexpected error occurred',
            }
        }
    }

    const logout = async (): Promise<AuthResult> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                return {
                    success: false,
                    error: 'An unexpected error occurred',
                }
            }

            return {
                success: true,
            }
        } catch (error) {
            console.error(error);
            return {
                success: false,
                error: 'An unexpected error occurred',
            }
        }
    }

    const value: AuthContextType = {
        user,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        isLoading,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;