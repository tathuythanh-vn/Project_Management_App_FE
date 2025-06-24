import {Button} from "@/components/ui/button";
import TaskTable from "@/components/task/task-table";
import TimeSpan from '@/components/project/time-span';
import {Project} from "@/model/project";
import {formatSnakeToTitle} from "@/utils/helper";
import StatusBadge from "@/components/badge/status-badge";
import CreateTaskBtn from "@/components/task/create-task-btn";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import EditProjectBtn from "@/components/project/edit-project-btn";
import ProjectOptionBtn from "@/components/project/project-option-btn";
import React from "react";


const ProjectDetailScreen = async ({params}: { params: Promise<{ slug: string }> }) => {
    const {slug} = await params;

    let project: Project | undefined = undefined;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${slug}`, {
            next: {revalidate: 60}
        })
        const {data} = await response.json();
        project = data;
    } catch (error) {
        console.error(error)
    }

    if (!project) {
        return <div className="p-6 text-center text-gray-500">Failed to load project.</div>;
    }

    return (
        <section>
            <div className="flex items-end justify-between">
                <div className='flex gap-2 items-center'>
                    <Link href={`/project`}><ArrowLeft /></Link>
                    <h1 className='text-2xl font-semibold'>{project.title}</h1>
                    <StatusBadge type={project.status}>{formatSnakeToTitle(project.status)}</StatusBadge>
                </div>
                <div className='flex gap-2 items-end gap-x-4'>
                    <EditProjectBtn project={project}>
                        <Button
                            className='shadow-sm text-white bg-[#036EFF] cursor-pointer hover:bg-white hover:border hover:text-[#036EFF] hover:scale-110 transition-all duration-100'>Edit Project</Button>
                    </EditProjectBtn>
                    <TimeSpan title='Time Spent' timestamp={project.startDate}/>
                    <TimeSpan title='Deadline' timestamp={project.endDate}/>
                </div>
            </div>
            <ProjectOptionBtn slug={slug} project={project} />
        </section>
    );
};

export default ProjectDetailScreen;
