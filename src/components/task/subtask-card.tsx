    'use client'

import {SubTask} from "@/model/task";
import {useState} from "react";
    import { toast } from "sonner"

interface SubtaskCardProps {
    subtask: SubTask;
    taskId: string;
}

const SubtaskCard = ({subtask, taskId, ...props}: SubtaskCardProps) => {
    const [isCompleted, setIsCompleted] = useState<boolean>(subtask.isCompleted);

    const handleClick = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}/subtask/${subtask._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isCompleted: !isCompleted
                })
            })

            // Validate response
            if (!response.ok) {
                throw new Error(`Failed to update subtask`);
            }

            toast.success("Subtask has been updated")

            setIsCompleted(!isCompleted);
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong. Please try again later.")
        }
    }

    return (
        <div {...props} className={`flex items-center gap-4 p-2 pb-4 border-b ${isCompleted ? 'line-through' : ''}`}>
            <input className={'w-4 h-4 rounded-full'} type='checkbox' checked={isCompleted} onChange={handleClick} />
            <div className={'flex-1'}>
                <h5 className={'text-base'}>{subtask.title}</h5>
                {subtask.description && <p className={'text-xs text-stone-600'}>{subtask.description}</p>}
            </div>
        </div>
    );
};

export default SubtaskCard;
