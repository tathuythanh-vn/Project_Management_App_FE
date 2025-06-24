// components/ui/status-badge.tsx

import React from 'react';
import { Badge } from "@/components/ui/badge";

export interface StatusBadgeProps {
    type: 'todo' | 'in_progress' | 'in_review' | 'completed';
    children?: React.ReactNode;
}

const colorMap: Record<StatusBadgeProps['type'], string> = {
    todo: 'bg-gray-100 text-gray-500',
    in_progress: 'bg-blue-100 text-blue-600',
    in_review: 'bg-yellow-100 text-yellow-600',
    completed: 'bg-green-100 text-green-600'
};

const StatusBadge = ({ type, children }: StatusBadgeProps) => {
    return (
        <Badge className={`${colorMap[type]} font-semibold`}>
            {children || type}
        </Badge>
    );
};

export default StatusBadge;