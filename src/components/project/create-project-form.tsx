'use client'

import React, {FormEvent, useState} from 'react';
import InputField from "@/components/form/input-field";
import SelectPriority from "@/components/select/select-priority";
import SelectStatus from '../select/select-status';
import {Button} from "@/components/ui/button";
import Modal from "@/components/popup/modal";
import {createProject, updateProject} from "@/service/project";
import {Priority, Project, Status, Type} from "@/model/project";
import Message from "@/components/text/message";
import {toast} from "sonner";
import {ApiResponse} from "@/model/api-response";
import SelectTeamMember from "@/components/select/select-team-member";
import SelectTeam from "@/components/select/select-team";

interface CreateProjectFormProps {
    onClose: () => void;
    project?: Project;
}

const CreateProjectForm = ({onClose, project}: CreateProjectFormProps) => {
    const [modalIsShown, setModalIsShown] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        try {
            const title = formData.get('title') as string;
            const startDate = new Date(formData.get('start_date') as string).toISOString() as string;
            const endDate = new Date(formData.get('end_date') as string).toISOString() as string;
            const description = formData.get('description') as string;
            const priority = formData.get('priority') as Priority;
            const status = formData.get('status') as Status;
            const teamId = formData.get('teamId') as string;

            const response = await createProject({
                title,
                startDate,
                endDate,
                description,
                priority: priority ? priority : 'low',
                status: status ? status : 'todo',
                teamId: teamId ? teamId : '',
            })

            const result: ApiResponse<Project> = await response.json();


            if (!response.ok) {
                setError(result.message || 'An unexpected error occurred')
                return
            }

            toast("Project has been created", {
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

    const updateHandler = async (event: FormEvent<HTMLFormElement>) => {
        if (!project) {
            return;
        }
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        try {
            const title = formData.get('title') as string;
            const startDate = new Date(formData.get('start_date') as string).toISOString() as string;
            const endDate = new Date(formData.get('end_date') as string).toISOString() as string;
            const description = formData.get('description') as string;
            const priority = formData.get('priority') as Priority;
            const status = formData.get('status') as Status;
            const teamId = formData.get('teamId') as string;

            const response = await updateProject(project?._id!,{
                title,
                startDate,
                endDate,
                description,
                priority: priority ? priority : 'low',
                status: status ? status : 'todo',
                teamId: teamId ? teamId : '',
            })

            const result: ApiResponse<Project> = await response.json();


            if (!response.ok) {
                setError(result.message || 'An unexpected error occurred')
                return
            }

            toast("Project has been updated", {
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
            <form className='p-3' onSubmit={project ? updateHandler : createHandler}>
                <h2 className='font-bold mb-4 text-xl'>{project ? 'Update Project' : 'Create Project'}</h2>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 justify-between'>
                    <InputField name='title' defaultValue={project?.title} isFocused>Project Title</InputField>
                    <InputField name='start_date' type='date' defaultValue={project?.startDate.split('T')[0]}>Start Date</InputField>
                    <InputField name='end_date' type='date' defaultValue={project?.endDate.split('T')[0]}>End Date</InputField>
                </div>
                <InputField name='description' type='textarea' placeholder='Describe about this project' defaultValue={project?.description}>Project
                    Description</InputField>
                <div className='flex gap-2'>
                    <SelectPriority name='priority' defaultValue={project?.priority}/>
                    <SelectStatus name='status' defaultValue={project?.status}/>
                    <SelectTeam name={'teamId'} defaultValue={project?.teamId} />
                </div>
                {error && <Message className={'mt-4'}>{error}</Message>}
                <div className='mt-4 flex items-center justify-end gap-2'>
                    <Button type='submit' className='text-white bg-blue-600 hover:bg-blue-800'>{project ? 'Update' : 'Create'}</Button>
                    <Button type='button' className='text-blue-600 bg-blue-50 hover:bg-blue-200'
                            onClick={() => setModalIsShown(true)}>Cancel</Button>
                </div>
            </form>
        </>
    );
};

export default CreateProjectForm;
