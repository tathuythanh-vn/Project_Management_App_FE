'use client'

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {AuthResult, useAuth} from "@/context/auth-context";
import Modal from "@/components/popup/modal";

const LogoutButton = () => {
    const [modalIsShown, setModalIsShown] = useState<boolean>(false);
    const router = useRouter();

    const {logout} = useAuth();

    const logoutHandler = async () => {
        try {
            const {success} = await logout();

            if (!success) {
                return;
            }

            router.push('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Modal isOpened={modalIsShown}
                   onClose={() => setModalIsShown(false)}
                   style={{width: '375px', maxWidth: '95%'}}
            >
                <p className='mb-4 text-lg'>Are you sure you want to logout?</p>
                <div className='flex gap-2 justify-end align-center'>
                    <Button onClick={() => setModalIsShown(false)}
                            variant='outline'
                            className='text-blue-500 hover:text-blue-700 border-0 cursor-pointer justify-start w-fit'>Cancel
                    </Button>
                    <Button onClick={logoutHandler}
                            variant='outline'
                            className='text-red-500 border-0 hover:text-red-700 cursor-pointer justify-start w-fit'>Logout
                    </Button>
                </div>
            </Modal>
            <Button onClick={() => setModalIsShown(true)}
                    variant='outline'
                    className='text-red-500 hover:text-blue-700 cursor-pointer justify-start w-fit'>Logout
            </Button>
        </>
    );
};

export default LogoutButton;
