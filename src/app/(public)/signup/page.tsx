'use client'
import React, {useEffect, useRef, useState} from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Message from "@/components/text/message";
import InputField from "@/components/form/input-field";
import {useRouter} from "next/navigation";
import {AuthResult, useAuth} from "@/context/auth-context";
import LoadingSpinner from "@/components/loading/loading-spinner";

const RegisterPage = () => {
    const router = useRouter();
    const [error, setError] = useState<string>('');
    const firstInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        firstInput.current?.focus();
    }, [firstInput]);

    const {register, isLoading} = useAuth();

    const signupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
        const password = (form.elements.namedItem('password') as HTMLInputElement)?.value;
        const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
        try {
            const {success, error}: AuthResult = await register(email, password, name)

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
        <form className='max-w-sm shadow-sm bg-white p-8 mx-auto' onSubmit={signupHandler}>
            <h2 className='mb-4 text-2xl font-bold'>Signup</h2>
            <InputField
                style={{width: '320px'}}
                name='email'
                placeholder={'user@gmail.com'}
                ref={firstInput}
            >
                Email
            </InputField>
            <InputField
                name='name'
                placeholder={'Jack Reacher'}
            >
                Full Name
            </InputField>
            <InputField
                name='password'
                placeholder={'strongPassword@234#'}
                type='password'
            >
                Password
            </InputField>

            {error && <Message type='error'>{error}</Message>}

            <Button
                type='submit'
                className='mt-4 w-full cursor-pointer'
                disabled={isLoading}
            >
                {isLoading ? <LoadingSpinner/> : 'Signup'}
            </Button>

            <div className='flex items-center justify-center gap-2 mt-4'>
                <p className='text-gray-500'>Already have an account?</p>
                <Button variant='link' className='text-blue-500 hover:text-blue-700 cursor-pointer' asChild>
                    <Link href='/login'>Login</Link>
                </Button>
            </div>
        </form>
    );
};

export default RegisterPage;