import React from 'react';
import {SidebarTrigger} from "@/components/ui/sidebar";
import Header from "@/components/header/header";
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NotificationCard from "@/components/notification/notification-card";


const InboxScreen = () => {
    return (
        <div>
            <h1 className='text-2xl font-semibold mb-4'>Notifications</h1>
            <div className={'flex flex-col gap-y-4'}>
                <div>
                    <h3 className={'text-[#646464] mb-2'}>March</h3>
                    <div className="grid grid-cols-1 w-full rounded-md overflow-hidden">
                        <NotificationCard />
                        <NotificationCard />
                    </div>
                </div>
                <div>
                    <h3 className={'text-[#646464]'}>March</h3>
                    <div className="grid grid-cols-1 w-full rounded-md overflow-hidden">
                        <NotificationCard />
                        <NotificationCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InboxScreen;
