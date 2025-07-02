'use client';
import React from 'react';
import {formatSnakeToTitle} from "@/utils/helper";
import PriorityBadge from "@/components/badge/priority-badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Priority} from "@/model/project";


interface PriorityDropdownProps {
    currentPriority: Priority;
    onChange: (newPriority: Priority) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PriorityDropdown = ({ currentPriority, onChange, onClick }: PriorityDropdownProps) => {
    const priorityList: Priority[] = ['low', 'medium', 'high', 'critical'];

    return (
        <div onClick={onClick}>
            <Select
                value={currentPriority}
                onValueChange={(value: string) => onChange(value as Priority)}
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select priority">
                        <PriorityBadge type={currentPriority}>
                            {formatSnakeToTitle(currentPriority)}
                        </PriorityBadge>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {priorityList.map(priority => (
                        <SelectItem key={priority} value={priority}>
                            <PriorityBadge type={priority}>
                                {formatSnakeToTitle(priority)}
                            </PriorityBadge>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default PriorityDropdown;
