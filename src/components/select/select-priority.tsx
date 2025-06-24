import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Circle, Activity, Flame, AlertTriangle} from "lucide-react";

interface SelectPriorityProps {
    name: string;
    defaultValue?: string;
}

export const priorities = [
    {
        value: 'low',
        label: 'Low',
        color: '#00a63e',
        hoverBg: 'hover:bg-green-100',
        icon: Circle
    },
    {
        value: 'medium',
        label: 'Medium',
        color: '#d08700',
        hoverBg: 'hover:bg-yellow-100',
        icon: Activity
    },
    {
        value: 'high',
        label: 'High',
        color: '#f54900',
        hoverBg: 'hover:bg-orange-100',
        icon: Flame
    },
    {
        value: 'critical',
        label: 'Critical',
        color: '#c10007',
        hoverBg: 'hover:bg-red-100',
        icon: AlertTriangle,
        font: 'font-semibold'
    }
];

const SelectPriority = ({name, defaultValue}: SelectPriorityProps) => {
    return (
        <Select name={name} defaultValue={defaultValue || priorities[0].value}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {priorities.map(({ value, label, color, hoverBg, icon: Icon, font }) => (
                        <SelectItem
                            key={value}
                            value={value}
                            className={`flex items-center gap-2 text-[${color}] ${font || ''} ${hoverBg}`}
                        >
                            <Icon className="w-4 h-4" color={color} />
                            {label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectPriority;