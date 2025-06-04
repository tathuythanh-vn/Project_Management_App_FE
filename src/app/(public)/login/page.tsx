'use client'
import React, {useEffect, useRef} from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import InputField from '@/components/form/input-field';
import Message from "@/components/text/message";
import {useRouter} from 'next/navigation'
import {AuthResult, useAuth} from "@/context/auth-context";
import LoadingSpinner from '@/components/loading/loading-spinner';

const LoginPage = () => {
    const router = useRouter();
    const firstInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        firstInput.current?.focus();
    }, [firstInput]);

    const [error, setError] = React.useState<string>('')

    const {login, isLoading} = useAuth();

    const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
        const password = (form.elements.namedItem('password') as HTMLInputElement)?.value;
        try {
            const {success, error}: AuthResult = await login(email, password)

            if (!success) {
                setError(error || 'An unexpected error occurred')
                return
            }

            router.push('/dashboard')
        } catch (error) {
            setError('An unexpected error occurred')
            console.error(error)
        }
    }

    return (
        <form className='max-w-sm shadow-sm bg-white p-6 mx-auto' onSubmit={loginHandler}>
            <h2 className='mb-4 text-2xl font-bold'>Login</h2>
            <InputField style={{width: '320px'}} ref={firstInput} name='email'
                        placeholder='user@gmail.com'>Email</InputField>
            <InputField name='password' placeholder='passsword#092'
                        type="password">Password</InputField>

            {error && <Message>{error}</Message>}

            {/*<Button type='submit' className='mt-4 w-full cursor-pointer'*/}
            {/*        disabled={isPending}>{isPending ? <LoadingSpinner/> : 'Login'}</Button>*/}

            <Button type='submit' className='mt-4 w-full cursor-pointer' disabled={isLoading}>{isLoading ?
                <LoadingSpinner/> : 'Login'}</Button>

            <div className='flex items-center justify-center gap-2 mt-4'>
                <p className='text-gray-500'>Didn't have an account?</p>
                <Button variant='link' className='text-blue-500 hover:text-blue-700 cursor-pointer' asChild>
                    <Link href='/signup'>Register</Link>
                </Button>
            </div>
        </form>
    )
}

export default LoginPage