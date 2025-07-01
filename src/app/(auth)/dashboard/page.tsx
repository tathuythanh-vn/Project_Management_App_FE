'use client'

import React, {useEffect, useState} from 'react';
import BoxItem from "@/components/dashboard/box-item";
import {CheckCircle, Clock, ListTodo, Newspaper} from "lucide-react";
import {Card, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {useAuth} from "@/context/auth-context";
import {getMeFull} from "@/service/auth";
import {PublicUser} from "@/model/user";
import {getDynamicGreeting} from "@/components/dashboard/dynamic-greeting";
import ProjectStatisticTable from "@/components/dashboard/project-statistic/project-statistic-table";
import RecentActivityTable from "@/components/dashboard/recent-activity/recent-activity-table";
import TaskTable from "@/components/task/task-table";
import TeamProductivityChart from "@/components/dashboard/team-productivity/team-productivity-chart";
import {Role} from "@/model/auth";
import { Button } from '@/components/ui/button';


const stats = [
    {
        id: 1,
        label: 'All Tasks',
        total: 50,
        icon: <Newspaper/>,
        bgColor: 'bg-[#5C45D6]'
    },
    {
        id: 2,
        label: 'To Do',
        total: 20,
        icon: <ListTodo/>,
        bgColor: 'bg-[#FFB84D]'
    },
    {
        id: 3,
        label: 'In Progress',
        total: 15,
        icon: <Clock/>,
        bgColor: 'bg-[#0092EE]'
    },
    {
        id: 4,
        label: 'Completed',
        total: 15,
        icon: <CheckCircle/>,
        bgColor: 'bg-green-500'
    }
];


const DashboardScreen = () => {
    const {user} = useAuth();
    const [userData, setUserData] = useState<PublicUser>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMeFull();
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setUserData(data.user);
            } catch (e) {
                console.error(e instanceof Error ? e.message : 'Failed to fetch user data');
            }
        }
        fetchData();
    }, [user]);

    const {text, emoji} = getDynamicGreeting();

    return (
        <>
            <h1 className='mb-6 mt-4 pl-4 text-3xl'>{text}, {userData?.fullName} {emoji}</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 my-6'>
                {stats.map(item => (
                    <Card key={item.id}>
                        <CardHeader>
                            <div className='flex items-center justify-between gap-4 w-full'>
                                <div>
                                    <CardTitle>{item.label}</CardTitle>
                                    <CardDescription
                                        className='text-2xl font-bold text-stone-800'>{item.total}</CardDescription>
                                    <CardDescription className='text-gray-500 text-sm'>100 last
                                        month</CardDescription>
                                </div>
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-full text-white ${item.bgColor}`}>
                                    {item.icon}
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 w-full gap-8">
                <BoxItem title='Project Progress'>
                    <ProjectStatisticTable/>
                </BoxItem>
                <BoxItem title='Assgined Tasks'>
                    <TaskTable shorten={true} />
                </BoxItem>
                {user?.userRole === Role.MANAGER && (
                    <>
                        <BoxItem title='Team Productivity'>
                            <TeamProductivityChart />
                        </BoxItem>
                        <BoxItem title='Recents Activities'>
                            <RecentActivityTable/>
                        </BoxItem>
                    </>
                )}
            </section>
        </>
    );
};

export default DashboardScreen;
