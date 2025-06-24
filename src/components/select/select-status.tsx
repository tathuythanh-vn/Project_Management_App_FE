import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Circle,
    Loader,
    CheckCircle,
    FileCheck
} from "lucide-react";

interface SelectStatusProps {
    name: string;
    defaultValue?: string;
}

export const statusOptions = [
    {
        value: 'todo',
        label: 'To Do',
        icon: Circle,
        color: 'text-gray-500',
        hover: 'hover:bg-gray-100',
        animate: false
    },
    {
        value: 'in_progress',
        label: 'In Progress',
        icon: Loader,
        color: 'text-blue-600',
        hover: 'hover:bg-blue-100',
        animate: true
    },
    {
        value: 'in_review',
        label: 'In Review',
        icon: FileCheck,
        color: 'text-yellow-600',
        hover: 'hover:bg-yellow-100',
        animate: false
    },
    {
        value: 'completed',
        label: 'Completed',
        icon: CheckCircle,
        color: 'text-green-600',
        hover: 'hover:bg-green-100',
        animate: false
    }
];

const SelectStatus = ({name, defaultValue}: SelectStatusProps) => {
    return (
        <Select name={name} defaultValue={defaultValue ? defaultValue : statusOptions[0].value}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Todo"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {statusOptions.map(({value, label, icon: Icon, color, hover, animate}) => (
                        <SelectItem
                            key={value}
                            value={value}
                            className={`flex items-center gap-2 ${color} ${hover}`}
                        >
                            <Icon className={`w-4 h-4 ${color} ${animate ? 'animate-spin-slow' : ''}`}/>
                            {label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectStatus;
