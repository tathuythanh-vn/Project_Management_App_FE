'use client'

import {createTeam} from "@/service/team";
import {Team} from "@/model/team";
import React, {FormEvent, useState} from 'react';
import InputField from "@/components/form/input-field";
import {Button} from "@/components/ui/button";
import Modal from "@/components/popup/modal";
import {ApiResponse} from "@/model/api-response";
import {toast} from "sonner";
import Message from "@/components/text/message";
import {useRouter} from "next/navigation";

interface CreateTeamFormProps {
    onClose: () => void;
}

const CreateTeamForm = ({onClose}: CreateTeamFormProps) => {
    const [modalIsShown, setModalIsShown] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        try {
            const name = formData.get('name') as string;
            const description = formData.get('description') as string;

            const response = await createTeam({
                name,
                description,
            })

            const result: ApiResponse<Team> = await response.json();

            if (!response.ok) {
                setError(result.message || 'An unexpected error occurred')
                return
            }

            toast("Team has been created", {
                description: Intl.DateTimeFormat('en-US', {
                    dateStyle: "full",
                    timeStyle: "long",
                }).format(new Date()),
            })

            onClose();
        } catch (error) {
            setError('An unexpected error occurred')
        }
    }

    return (
        <>
            <Modal isOpened={modalIsShown} onClose={onClose} style={{width: '375px', maxWidth: '95%'}}>
                <p className='mb-4 text-lg'>Are you sure you want to cancel?</p>
                <div className='flex gap-2 justify-end align-center'>
                    <Button onClick={() => setModalIsShown(false)}
                            variant={'ghost'}
                            className='text-green-500 hover:text-green-700 border-0 cursor-pointer justify-start w-fit'>No
                    </Button>
                    <Button onClick={() => onClose()}
                            variant={'ghost'}
                            className='text-red-500 border-0 hover:text-red-700 cursor-pointer justify-start w-fit'>Yes
                    </Button>
                </div>
            </Modal>
            <form className='p-3' onSubmit={submitHandler}>
                <h2 className='font-bold mb-4 text-xl'>Create team</h2>
                <InputField name='name'>Team Name</InputField>
                <InputField name='description' type='textarea' placeholder='Describe about this team'>Team
                    Description</InputField>
                {error && <Message>{error}</Message>}
                <div className='mt-4 flex items-center justify-end gap-2'>
                    <Button type='submit' className='text-white bg-blue-600 hover:bg-blue-800'>Create</Button>
                    <Button type='button' className='text-blue-600 bg-blue-50 hover:bg-blue-200'
                            onClick={() => setModalIsShown(true)}>Cancel</Button>
                </div>
            </form>
        </>
    );
};

export default CreateTeamForm;