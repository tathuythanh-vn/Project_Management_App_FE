'use client';
import React from 'react';
import {Status} from "@/model/project";
import {formatSnakeToTitle} from "@/utils/helper";
import StatusBadge from "@/components/badge/status-badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface StatusDropdownProps {
    currentStatus: Status;
    onChange: (newStatus: Status) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const StatusDropdown = ({currentStatus, onChange, onClick}: StatusDropdownProps) => {
    const statusList: Status[] = ['todo', 'in_progress', 'in_review', 'completed'];

    return (
        <div onClick={onClick}>
            <Select value={currentStatus} onValueChange={(value: string) => onChange(value as Status)}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select status">
                        <StatusBadge type={currentStatus}>
                            {formatSnakeToTitle(currentStatus)}
                        </StatusBadge>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {statusList.map(status => (
                        <SelectItem key={status} value={status}>
                            <StatusBadge type={status}>{formatSnakeToTitle(status)}</StatusBadge>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default StatusDropdown;
