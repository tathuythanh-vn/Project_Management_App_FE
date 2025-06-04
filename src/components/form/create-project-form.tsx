'use client'

import React, {FormEvent, useState} from 'react';
import InputField from "@/components/form/input-field";
import SelectPriority from "@/components/select/select-priority";
import SelectStatus from '../select/select-status';
import {Button} from "@/components/ui/button";
import Modal from "@/components/popup/modal";
import {createProject} from "@/service/project";
import {Priority, ProjectStatus, ProjectType} from "@/model/project";
import Message from "@/components/text/message";
import {toast} from "sonner";

interface CreateProjectFormProps {
    onClose: () => void;
}

const CreateProjectForm = ({onClose}: CreateProjectFormProps) => {
    const [modalIsShown, setModalIsShown] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title = formData.get('title') as string;
        const type = formData.get('type') as ProjectType;
        const startDate = new Date(formData.get('start_date') as string).toISOString() as string;
        const endDate = new Date(formData.get('end_date') as string).toISOString() as string;
        const description = formData.get('description') as string;
        const priority = formData.get('priority') as Priority;
        const status = formData.get('status') as ProjectStatus;

        try {
            const {success, error} = await createProject({
                title,
                type,
                startDate,
                endDate,
                description,
                priority,
                status,
            })


            if (!success) {
                setError(error || 'An unexpected error occurred')
                return
            }

            toast("Event has been created", {
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
                <h2 className='font-bold mb-4'>Create Project</h2>
                <div className='flex gap-2 justify-between'>
                    <InputField name='title'>Project Title</InputField>
                    <InputField name='type'>Project Type</InputField>
                    <InputField name='start_date' type='date'>Start Date</InputField>
                    <InputField name='end_date' type='date'>End Date</InputField>
                </div>
                <InputField name='description' type='textarea' placeholder='Describe about this project'>Project
                    Description</InputField>
                <div className='flex gap-2'>
                    <SelectPriority name='priority'/>
                    <SelectStatus name='status'/>
                </div>
                {error && <Message>{error}</Message>}
                <div className='mt-4 flex items-center justify-end gap-2'>
                    <Button type='submit' className='text-white bg-blue-600 hover:bg-blue-800'>Create</Button>
                    <Button type='button' className='text-blue-600 bg-blue-50 hover:bg-blue-200'
                            onClick={() => setModalIsShown(true)}>Delete</Button>
                </div>
            </form>
        </>
    );
};

export default CreateProjectForm;
