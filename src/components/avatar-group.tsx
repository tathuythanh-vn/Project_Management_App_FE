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
            {user.slice(0, visibleCount).map((item, index) => {
                return (
                    <Avatar className={'shadow-sm'}
                            key={item.userId._id}
                            style={{
                                marginLeft: index > 0 ? '-0.5rem' : '0',
                                zIndex: user.length + index
                            }}>
                        <AvatarImage src={`${process.env.NEXT_PUBLIC_FILE_URL}${item.userId.avatar}`} />
                        <AvatarFallback>{item.userId.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                );
            })}
        </div>
    );
};

export default AvatarGroup;
