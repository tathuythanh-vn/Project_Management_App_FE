// components/ui/priority-badge.tsx

import React from 'react';
import { Badge } from "@/components/ui/badge";

export interface PriorityBadgeProps {
    type: 'low' | 'medium' | 'high' | 'critical';
    children?: React.ReactNode;
}

const colorMap: Record<PriorityBadgeProps['type'], string> = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-orange-100 text-orange-700',
    critical: 'bg-red-100 text-red-700 font-semibold'
};

const PriorityBadge = ({ type, children }: PriorityBadgeProps) => {
    return (
        <Badge className={colorMap[type]}>
            {children || type}
        </Badge>
    );
};

export default PriorityBadge;
