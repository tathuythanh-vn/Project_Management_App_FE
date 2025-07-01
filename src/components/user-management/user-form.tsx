import React, {useState} from 'react';
import InputField from "@/components/form/input-field";
import Message from "@/components/text/message";
import {Button} from "@/components/ui/button";
import LoadingSpinner from "@/components/loading/loading-spinner";
import Link from "next/link";
import {AuthResult, useAuth} from "@/context/auth-context";
import {toast} from "sonner";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {CheckCircle, XCircle} from 'lucide-react';
import {Role} from "@/model/auth";
import {capitalize} from "@/utils/helper";
import {PublicUser} from "@/model/user";
import {createUser, updateUser} from "@/service/user";

interface UserFormProps {
    user?: PublicUser;
    isEdit?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const defaultPassword = 'password123'

const UserForm = ({user, isEdit = false, onCancel, onConfirm}: UserFormProps) => {
    const [error, setError] = useState<string>('');

    const {isLoading} = useAuth();

    const signupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
        const password = defaultPassword;
        const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
        const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value;
        const active: boolean = (form.elements.namedItem('active') as HTMLInputElement)?.value === "true";
        const role: Role = (form.elements.namedItem('role') as HTMLInputElement)?.value as Role;

        console.log(phone)

        try {
            const response = await createUser({
                email,
                password,
                name,
                phone,
                role,
                active,
            })
            const data = await response.json()

            if (!response.ok) {
                setError(data.message)
                throw new Error(data.message)
            }

            onConfirm()
            toast.success("Create user successful")
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred')
            console.error(error)
        }
    }

    const updateHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        if (!isEdit || !user) {
            throw new Error('User is not found')
        }

        event.preventDefault();
        const form = event.currentTarget;

        const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
        const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value;
        const active: boolean = (form.elements.namedItem('active') as HTMLInputElement)?.value === "true";
        const role: Role = (form.elements.namedItem('role') as HTMLInputElement)?.value as Role;

        try {
            const response = await updateUser(user?._id, {
                fullName: name,
                phone,
                role,
                active,
            })
            const data = await response.json()

            if (!response.ok) {
                setError(data.message)
                throw new Error(data.message)
            }

            onConfirm()
            toast.success("Update user successful")
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unexpected error occurred')
            console.error(error)
        }
    }

    return (
        <form className={'p-2'} onSubmit={isEdit ? updateHandler : signupHandler}>
            <h2 className='mb-4 text-2xl font-bold'>
                {isEdit ? 'Edit User' : 'Create New User'}
            </h2>
            <InputField
                style={{width: '320px'}}
                name='email'
                placeholder={'user@gmail.com'}
                isFocused={true}
                defaultValue={user?.email}
                disabled={isEdit}
            >
                Email
            </InputField>
            <InputField
                name='name'
                placeholder={'Jack Reacher'}
                defaultValue={user?.fullName}
            >
                Full Name
            </InputField>
            <InputField
                name='phone'
                placeholder={'0123456789'}
                defaultValue={user?.phone}
            >
                Phone Number
            </InputField>

            {!isEdit &&
                <InputField
                    name='password'
                    placeholder={'0123456789'}
                    defaultValue={defaultPassword}
                    disabled={true}
                >
                    Password
                </InputField>}

            <div className="flex flex-col gap-2">
                <label>Role</label>
                <Select defaultValue={user?.role} name={'role'}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Role"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Choose User Role</SelectLabel>
                            {Object.values(Role).map(role => (
                                <SelectItem key={role} value={role}>{capitalize(role)}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2 mt-2">
                <label>Status</label>
                <Select defaultValue={user?.active?.toString()} name={'active'}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Choose Status</SelectLabel>
                            <SelectItem value="true"><CheckCircle color={'#008000'}/> Active</SelectItem>
                            <SelectItem value="false"><XCircle color={'#D8392B'}/> Unactive</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {error && <Message className={'mt-4'}>{error}</Message>}

            <div className='flex justify-center items-center mt-6 gap-2'>
                <Button
                    type='button'
                    variant='ghost'
                    className='cursor-pointer text-red-500 hover:text-red-800 hover:bg-transparent'
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type='submit'
                    className='cursor-pointer'
                    disabled={isLoading}
                >
                    {isLoading ? <LoadingSpinner/> : 'Confirm'}
                </Button>
            </div>
        </form>
    );
};

export default UserForm;
