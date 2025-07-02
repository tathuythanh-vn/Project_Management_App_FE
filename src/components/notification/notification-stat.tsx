'use client'

import React, {useEffect, useState, ReactNode} from 'react';
import type {NotificationStat} from "@/model/notification";
import {getNotificationStats} from "@/service/notification";
import {Bell, Eye, EyeOff, TrendingUp} from "lucide-react";
import {capitalize} from "@/utils/helper";
import {Progress} from "@/components/ui/progress";

// Card component
interface NotificationStatCardProps {
    title: string;
    count: number;
    children: ReactNode;
    style?: React.CSSProperties;
}

const NotificationStatCard = ({title, count, children, style}: NotificationStatCardProps) => {
    return (
        <div style={style}
            className="bg-white p-4 rounded-lg shadow-sm w-full max-w-sm flex items-center justify-between gap-4 text-white">
            <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium capitalize">{title}</h3>
                <p className="text-xl font-semibold">{count}</p>
            </div>
            {children}
        </div>
    );
};

// Main component
const StatIcon = {
    all: {
        icon: <Bell size={24} color={'#fff'}/>,
        color: '#2b7fff',
    },
    read: {
        icon: <Eye size={24} color={'#fff'}/>,
        color: '#22c55e', // Tailwind green-500
    },
    unread: {
        icon: <EyeOff size={24} color={'#fff'}/>,
        color: '#F26712',
    },
};

const NotificationStat = () => {
    const [stats, setStats] = useState<NotificationStat | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getNotificationStats();
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setStats(data.data);
            } catch (e) {
                console.error(e instanceof Error ? e.message : 'Something went wrong.');
            }
        };
        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
            {stats &&
                Object.entries(stats).filter(([key, _]) => key !== 'engagement').map(([key, value]) => {
                    const { icon, color } = StatIcon[key as keyof typeof StatIcon];
                    return (
                        <NotificationStatCard
                            key={key}
                            title={capitalize(key)}
                            count={value}
                            style={{ backgroundColor: color }} // dynamically set background color
                        >
                            {icon}
                        </NotificationStatCard>
                    );
                })}
            <div className="bg-white p-4 rounded-lg shadow-sm w-full flex flex-col gap-4">
                <h3>Engagement {stats?.engagement}%</h3>
                <Progress value={stats?.engagement} max={100} color={'#2b7fff'} />
            </div>
        </div>
    );
};

export default NotificationStat;
