'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {SquareCheckBig, Users} from "lucide-react";
import TaskTable from "@/components/task/task-table";
import EditProjectBtn from "@/components/project/edit-project-btn";
import {Project} from "@/model/project";
import CreateTaskBtn from "@/components/task/create-task-btn";
import ProjectMemberTable from "@/components/project/project-member-table";
import AddProjectMemberBtn from "@/components/project/add-project-member-btn";
import {useRouter, useSearchParams} from "next/navigation";

interface ProjectOptionBtnProps {
    slug: string;
    project: Project;
}

type ViewMode = 'member' | 'task';

const ProjectOptionBtn = ({slug, project}: ProjectOptionBtnProps) => {
    const [options, setOptions] = useState<ViewMode>('member');
    const [refetchFn, setRefetchFn] = useState<() => void>(() => () => {
    });
    const [refetchTask, setRefetchTask] = useState<() => void>(() => () => {
    });


    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')
    const router = useRouter();

    const handleModeChange = useCallback((mode: ViewMode) => {
        setOptions(mode);
        router.push(`?mode=${mode}`);
    }, [router]);

    useEffect(() => {
        const modeFromUrl = searchParams.get('mode') as ViewMode;
        if (modeFromUrl === 'task' || modeFromUrl === 'member') {
            setOptions(modeFromUrl);
        } else {
            setOptions('member');
        }
    }, [searchParams]);

    return (
        <>
            <div className={'flex justify-between items-center mt-8'}>
                <div className={'flex items-center gap-2 w-fit'}>
                    <Button
                        className={`${options === 'member' ? 'bg-[#036EFF]' : 'bg-white text-[#036EFF] '} cursor-pointer hover:bg-white  hover:border border-[#036EFF] hover:text-[#036EFF] hover:scale-110 transition-all duration-100`}
                        onClick={() => handleModeChange('member')}><Users/> Members</Button>
                    <Button
                        className={`${options === 'task' ? 'bg-[#036EFF]' : 'bg-white text-[#036EFF] '} cursor-pointer hover:bg-white hover:border border-[#036EFF] hover:text-[#036EFF] hover:scale-110 transition-all duration-100`}
                        onClick={() => handleModeChange('task')}><SquareCheckBig/>Tasks</Button>
                </div>
                <div className={'flex gap-2'}>
                    <CreateTaskBtn projectId={slug}
                                   onConfirm={() => {
                                       refetchTask();
                                       setOptions('task');
                                   }}
                    />
                    <AddProjectMemberBtn project={project} slug={slug} onConfirm={() => {
                        refetchFn();
                        setOptions('member');
                    }}/>
                </div>
            </div>

            {options === 'task'
                ? <TaskTable
                    slug={slug}
                    onRefetchReady={(ref) => setRefetchTask(() => ref)}
                />
                : <ProjectMemberTable
                    slug={slug}
                    onRefetchReady={(ref) => setRefetchFn(() => ref)}
                />
            }
        </>
    );
};

export default ProjectOptionBtn;
