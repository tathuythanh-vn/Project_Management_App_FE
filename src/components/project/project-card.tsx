import {SquarePen, Hourglass, BadgeAlert} from 'lucide-react';
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import React from "react";
import Link from "next/link";
import {Project, Type} from "@/model/project";
import {formarDateTime, formatSnakeToTitle} from "@/utils/helper";
import StatusBadge from "@/components/badge/status-badge";
import EditProjectBtn from "@/components/project/edit-project-btn";

interface ProjectCardProps {
    project: Project;
}


const ProjectCard = ({project}: ProjectCardProps) => {

    const {title, description, endDate, _id, status, tasks} = project;

    return (
        <div className='p-4 shadow-sm rounded-sm bg-white'>
            <div className='flex justify-between items-center gap-4 border-b-2 border-gray-200 pb-2'>
                <div className='flex items-center gap-2'>
                    <h3 className='font-bold text-xl line-clamp-1'>{title}</h3>
                    <EditProjectBtn project={project}>
                        <SquarePen
                            className={'w-5 h-5 shrink-0 text-gray-500 hover:scale-110 hover:text-red-500'}
                        />
                    </EditProjectBtn>
                </div>
                <StatusBadge type={status}>{formatSnakeToTitle((status))}</StatusBadge>
            </div>
            <Link href={`/project/${_id}`}>
                <p className='mt-4 mb-6 line-clamp-3 leading-normal h-[4.5em]'>{description}</p>
                <p className='flex items-center gap-1 mb-4'>
                    <Hourglass width={16} height={16} className={'text-red-500'}/>
                    <span className='text-red-500 font-bold'>{formarDateTime(new Date(endDate))}</span>
                </p>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex items-center gap-1'>
                        <BadgeAlert/>
                        <p>{tasks?.length} issues</p>
                    </div>
                </div>
            </Link>

        </div>
    );
};

export default ProjectCard;
