import React from 'react';
import {Badge} from "@/components/ui/badge";

interface TaskLabelProps {
    label: string;
    children?: React.ReactNode;
    className?: string;
}

const TaskLabel = ({label, children, className}: TaskLabelProps) => {
    return (
        <div className={'flex gap-4 items-center'}>
            <p className={'w-[8ch] text-sm text-stone-600'}>{label}</p>
            <p className={`${className} text-sm`}>
                {children}
            </p>
        </div>
    );
};

export default TaskLabel;
