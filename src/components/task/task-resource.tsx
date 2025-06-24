'use client'

import {useState} from "react";
import {SubTask} from "@/model/task";
import SubtaskCard from "@/components/task/subtask-card";

interface TaskResourceProps {
    subtasks?: SubTask[];
    taskId: string;
}

const TaskResource = ({subtasks, taskId}: TaskResourceProps) => {
    const [selected, setSelected] = useState<'subtask' | 'comment'>('subtask');

    let content = (
        <div className={'mt-4 flex flex-col gap-'}>
            {subtasks?.map((subtask) => (
                <SubtaskCard key={subtask._id} subtask={subtask} taskId={taskId}/>
            ))}
        </div>
    );


    return (
        <div className={'pt-5'}>
            <div className={'flex flex-wrap items-center gap-4 border-b'}>
                <button className={`border-b-2 pb-2 transition-all duration-300 font-semibold ${selected === 'subtask' ? 'border-stone-900' : 'border-transparent'}`} onClick={() => setSelected('subtask')}>Subtask</button>
                <button className={`border-b-2 pb-2 transition-all duration-300 font-semibold ${selected === 'comment' ? 'border-stone-900' : 'border-transparent'}`} onClick={() => setSelected('comment')}>Comments</button>
            </div>
            {content}
        </div>
    );
};

export default TaskResource;
