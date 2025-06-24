import React from 'react';
import BoxItem from "@/components/dashboard/box-item";
import {SidebarTrigger} from "@/components/ui/sidebar";
import Header from "@/components/header/header";
import {CheckCircle, Clock, ListTodo, Newspaper} from "lucide-react";
import {Card, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'This is the dashboard page',
};

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


    return (
            <>
                <h1 className='mb-6 mt-4 pl-4 text-3xl'>Good morning, Kevin</h1>
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
                    <BoxItem title='Recents'/>
                    <BoxItem title='My Work'/>
                    <BoxItem title='Recents'/>
                    <BoxItem title='Assigned to me'/>
                </section>
            </>
    );
};

export default DashboardScreen;
