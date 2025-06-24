import React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {PublicUser} from "@/model/user";
import {Member} from "@/model/team";

interface AvatarGroupProps {
    user: Member[];
    visibleCount: number;
}

const AvatarGroup = ({user, visibleCount = 3}: AvatarGroupProps) => {
    if (!user || user.length === 0) return;

    return (
        <div className="flex items-center mb-4">
            {user.slice(0, visibleCount).map((user) => {
                return (
                    <Avatar className={'shadow-sm'} key={user.userId._id}>
                        <AvatarImage src={user.userId.avatar}/>
                        <AvatarFallback>{user.userId.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                );
            })}
        </div>
    );
};

export default AvatarGroup;
