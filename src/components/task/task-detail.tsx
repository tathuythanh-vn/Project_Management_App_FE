import React from 'react';
import {Task} from "@/model/task";
import {Badge} from "@/components/ui/badge";
import TaskLabel from './task-label';
import {formarDateTime, formatSnakeToTitle} from "@/utils/helper";
import {clsx} from "clsx";
import {X} from "lucide-react";
import TaskResource from "@/components/task/task-resource";
import PriorityBadge from "@/components/badge/priority-badge";
import StatusBadge from "@/components/badge/status-badge";


interface TaskDetailProps {
    task: Task;
    onClose: () => void;
}

const TaskDetail = ({task, onClose}: TaskDetailProps) => {
    if (!task) return;

    return (
        <>
            <div className={'pb-5 border-b-2 border-[#DEE1E6]'}>
                <div className={'flex justify-between items-center mb-4'}>
                    <p className={'text-stone-600 text-xs'}>Project / Task ID-{task._id}</p>
                    <X onClick={onClose} className={'cursor-pointer hover:text-red-500 transition-all duration-300'}/>
                </div>
                <h3 className={'text-xl font-semibold mb-4'}>{task.title}</h3>
                <div className={'flex flex-col gap-y-2'}>
                    <TaskLabel label={'Priority'}>
                        <PriorityBadge type={task.priority}>{formatSnakeToTitle(task.priority)}</PriorityBadge>
                    </TaskLabel>
                    <TaskLabel label={'Status'}>
                        <StatusBadge type={task.status}>{formatSnakeToTitle(task.status)}</StatusBadge>
                    </TaskLabel>
                    <TaskLabel label={'Owner'}>{task.owner.fullName}</TaskLabel>
                    <TaskLabel
                        className={clsx({ 'text-red-500': !task?.assignee?.fullName })}
                        label="Assignee"
                    >
                        {task?.assignee?.fullName || 'Not assigned'}
                    </TaskLabel>
                    <TaskLabel label={'Due Date'}>{formarDateTime(new Date(task.endDate))}</TaskLabel>
                </div>
            </div>
            <div className={'py-5 border-b-2 border-[#DEE1E6]'}>
                <p className={'text-base mb-2 font-semibold'}>Description</p>
                <p className={'text-stone-600 text-sm'}>{task.description}</p>
            </div>
            <TaskResource subtasks = {task.subtasks} taskId={task._id!}/>
        </>
    );
};

export default TaskDetail;
