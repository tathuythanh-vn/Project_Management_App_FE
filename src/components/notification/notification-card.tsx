import React from 'react';
import {Checkbox} from "@/components/ui/checkbox";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const NotificationCard = () => {
    return (
        <div className="flex items-center justify-between bg-zinc-50 px-4 py-2 w-full">
            <div className="flex items-center gap-4">
                <Checkbox/>
                <h2>Task name</h2>
            </div>
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>Huy Thanh <span className='text-[#5C45D6]'>assigned this task to you</span></p>
            </div>
            <p>Apr 1</p>
        </div>
    );
};

export default NotificationCard;
