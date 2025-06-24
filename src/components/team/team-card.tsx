import React from 'react';
import {Team} from "@/model/team";
import Link from "next/link";
import {Badge} from '../ui/badge';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Users} from "lucide-react";

const TeamCard = ({team}: { team: Team }) => {
    if (!team) return null;

    return (
        <Link href={`/team/${team._id}`} className="from-[#3D80F6] to-[#9135EA] bg-gradient-to-r rounded-md shadow-sm">
            <div className={'text-white p-4'}>
                <div className={'flex items-center justify-between mb-4'}>
                    <h3 className={'font-semibold text-xl'}>{team.name}</h3>
                    {/*<Badge className={'text-[#3D80F6]'} variant={'secondary'}>Status</Badge>*/}
                </div>
                <p>{team.description}</p>
            </div>
            <div className={'bg-white p-4 border-b border-gray-200'}>
                <div className={'flex items-center gap-x-4 mb-4'}>
                    <Avatar>
                        <AvatarImage src={team.owner.fullName}/>
                        <AvatarFallback>{team.owner.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p>{team.owner.fullName}</p>
                        <p>Manager</p>
                    </div>
                </div>
                <div className={'flex items-center gap-x-2'}>
                    <Users size={16}/>
                    <span className={'text-sm'}>{team.members?.length} Members</span>
                </div>
            </div>
            <p className={'text-xs text-center p-4 bg-white text-stone-400'}>Click to view details</p>
        </Link>
    );
};

export default TeamCard;
