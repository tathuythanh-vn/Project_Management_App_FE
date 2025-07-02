'use client'

import InputField from "@/components/form/input-field";
import {FormEvent, useState} from "react";
import {toast} from "sonner";
import {addSubtask, updateSubtask} from "@/service/task";
import Message from "@/components/text/message";
import {Button} from "@/components/ui/button";
import {Subtask} from "@/model/task";

interface SubtaskFormProps {
    isEdit?: boolean;
    taskId: string;
    subtask?: Subtask
    onConfirm: () => void;
    onCancel: () => void;
}

const SubtaskForm = ({isEdit = false, taskId, subtask, onConfirm, onCancel}: SubtaskFormProps) => {
    const [error, setError] = useState<string>('');

    if (isEdit) {
        if (!subtask) {
            throw new Error('Subtask is not found')
        }
    }

    const handleCreate = async (e: FormEvent<HTMLFormElement>, taskId: string) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const title = formData.get('title') as string;
            const description = formData.get('description') as string;
            const isCompleted = formData.has('isCompleted');

            const response = await addSubtask(taskId, {
                title,
                description,
                isCompleted,
            })

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'An unexpected error occurred')
            }

            onConfirm()

            toast.success("Subtask has been created")
        } catch (error) {
            console.error(error instanceof Error ? error.message : error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred.');
            toast.error("Something went wrong. Please try again later.")
        }
    }


    const handleEdit = async (e: FormEvent<HTMLFormElement>, taskId: string, subtaskId: string, data: Partial<Subtask>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const title = formData.get('title') as string;
            const description = formData.get('description') as string;
            const isCompleted = formData.has('isCompleted');

            const response = await updateSubtask(taskId, subtaskId, {
                title,
                description,
                isCompleted,
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'An unexpected error occurred')
            }

            onConfirm()
            toast.success("Subtask has been updated")
        } catch (error) {
            console.error(error instanceof Error ? error.message : error);
            setError(error instanceof Error ? error.message : 'An unexpected error occurred.');
            toast.error("Something went wrong. Please try again later.")
        }
    }

    return (
        <form onSubmit={isEdit
            ? (e) => handleEdit(e, taskId, subtask?._id!, subtask!)
            : (e) => handleCreate(e, taskId)}>
            <h3 className={'font-semibold mb-4 text-xl'}>{isEdit ? 'Edit Subtask' : 'Create Subtask'}</h3>
            <InputField name={'title'} defaultValue={subtask?.title} isFocused={true}>Title</InputField>
            <InputField type={'textarea'} name={'description'}
                        defaultValue={subtask?.description}>Description</InputField>
            <div className={'flex items-center mt-4'}>
                <input name={'isCompleted'} type={'checkbox'} className={'mr-2 w-4 h-4'}
                       defaultChecked={subtask?.isCompleted}/>
                <label>Completed</label>
            </div>
            {error && <Message className={'mt-4'}>{error}</Message>}
            <div className={'flex justify-end mt-4'}>
                <Button
                    onClick={onCancel}
                    type={'button'} variant={'ghost'}
                    className={'text-red-500 hover:text-red-800 hover:bg-transparent cursor-pointer'}>Cancel</Button>
                <Button type={'submit'}
                        className={'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 cursor-pointer ml-2'}>
                    {isEdit ? 'Update' : 'Create'}
                </Button>
            </div>
        </form>
    );
};

export default SubtaskForm;
