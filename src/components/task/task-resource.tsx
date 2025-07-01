'use client'

import {useState} from "react";
import {Subtask} from "@/model/task";
import SubtaskCard from "@/components/task/subtask-card";
import {Plus} from "lucide-react";
import AddSubtaskBtn from "@/components/task/add-subtask-btn";
import SubtaskList from "@/components/task/subtask-card";
import AssetList from "@/components/asset/asset-list";

interface TaskResourceProps {
    subtasks?: Subtask[];
    taskId: string;
    refetch: () => void;
}

const TaskResource = ({subtasks, taskId, refetch}: TaskResourceProps) => {
    const [selected, setSelected] = useState<'subtask' | 'comment'>('subtask');

    let content = (
        <SubtaskList subtasks={subtasks} taskId={taskId} refetch={refetch}/>
    );

    return (
        <div className={'pt-3'}>
            <div className={'flex items-center justify-between'}>
                <div className={'flex flex-wrap items-center gap-4 border-b'}>
                    <button
                        className={`border-b-2 pb-2 transition-all duration-300 font-semibold cursor-pointer ${selected === 'subtask' ? 'border-stone-900' : 'border-transparent'}`}
                        onClick={() => setSelected('subtask')}>Subtask
                    </button>
                    <button
                        className={`border-b-2 pb-2 transition-all duration-300 font-semibold cursor-pointer ${selected === 'comment' ? 'border-stone-900' : 'border-transparent'}`}
                        onClick={() => setSelected('comment')}>Comments
                    </button>
                </div>
                <AddSubtaskBtn taskId={taskId} onConfirm={() => setSelected('subtask')} refetch={refetch}/>
            </div>
            <div className={'mt-4 max-h-[140px] overflow-y-auto'}>
                {content}
            </div>
        </div>
    );
};

export default TaskResource;
