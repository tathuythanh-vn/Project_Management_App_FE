'use client'

import {Subtask} from "@/model/task";
import {useState} from "react";
import {toast} from "sonner"
import Modal from "@/components/popup/modal";
import SubtaskForm from "@/components/task/subtask-form";
import {Pencil, Trash2} from "lucide-react";
import AlertConfirm from "@/components/popup/alert-confirm";
import {deleteSubtask} from "@/service/task";

interface SubtaskCardProps {
    subtask: Subtask;
    taskId: string;
    refetch: () => void;
}

const SubtaskCard = ({subtask, taskId, refetch, ...props}: SubtaskCardProps) => {
    const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

    const handleClick = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}/subtask/${subtask._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isCompleted: !subtask.isCompleted,
                })
            })

            // Validate response
            if (!response.ok) {
                throw new Error(`Failed to update subtask`);
            }

            refetch()
            toast.success("Subtask has been updated")
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong. Please try again later.")
        }
    }

    const deleteHandler = async () => {
        try {
            const response = await deleteSubtask(taskId, subtask._id)

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.message);
            }

            toast.success("Subtask has been removed.")
            refetch()
        } catch (e) {
            toast.error(e instanceof Error ? e.message : 'Failed to remove member.');
        }
    }

    return (
        <>
            <Modal isOpened={modalIsOpened}
                   onClose={() => setModalIsOpened(false)}
                   style={{width: '375px', maxWidth: '95%'}}>
                <SubtaskForm
                    isEdit={true}
                    subtask={subtask}
                    taskId={taskId}
                    onCancel={() => setModalIsOpened(false)}
                    onConfirm={() => {
                        setModalIsOpened(false)
                        refetch()
                    }}
                />
            </Modal>
            <div
                {...props}
                className={`flex items-center justify-between gap-3 pb-4 p-2 border-b ${subtask.isCompleted ? 'line-through' : ''}`}>
                <input className={'w-4 h-4 rounded-full'} type='checkbox' checked={subtask.isCompleted}
                       onChange={handleClick}/>
                <div className={'flex-1'}>
                    <div className={'flex items-center justify-between gap-2 mb-1'}>
                        <h5 className={'text-base'}>{subtask.title}</h5>
                        <div className={'flex items-center gap-2'}>
                            <Pencil size={16}
                                    className={'cursor-pointer text-stone-600 hover:text-stone-700 transition-all duration-300'}
                                    onClick={() => setModalIsOpened(true)}/>
                            <AlertConfirm onConfirm={deleteHandler}>
                                <Trash2 size={16}
                                        className={'cursor-pointer text-stone-600 hover:text-stone-700 transition-all duration-300'}/>
                            </AlertConfirm>
                        </div>
                    </div>
                    {subtask.description && <p className={'text-xs text-stone-600'}>{subtask.description}</p>}
                </div>
            </div>
        </>
    );
};

interface SubtaskListProps {
    subtasks?: Subtask[];
    taskId: string;
    refetch: () => void;
}

const SubtaskList = ({subtasks, taskId, refetch}: SubtaskListProps) => {
    if (subtasks?.length === 0) {
        return (
            <p className={'text-stone-600 text-center py-2'}>No subtask yet</p>
        )
    }

    return (
        <div className={'flex flex-col gap-1'}>
            {subtasks?.map((subtask) => (
                <SubtaskCard key={subtask._id} subtask={subtask} taskId={taskId} refetch={refetch}/>
            ))}
        </div>
    )
}

export default SubtaskList;
