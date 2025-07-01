'use client'

import ProjectCard from '@/components/project/project-card';
import CreateProjectButon from "@/components/project/create-project-btn";
import {getProjects} from "@/service/project";
import {Project} from "@/model/project";
import useFetch from "@/hooks/use-fetch"

const ProjectScreen = () => {
    const {dataFetched: projects, error, isLoading, refetch} = useFetch<Project>(getProjects, [])

    let content = (<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {projects?.map((project: Project) => (
            <ProjectCard key={project._id} project={project} />
        ))}
    </div>)


    if (error) {
        return <div className='text-center text-2xl'>
            {error}
        </div>
    }

    // Show loading state
    if (isLoading) {
        content = <p className='text-lg'>Loading projects...</p>
    }

    if (projects?.length === 0) {
        content = <p className='text-lg'>You don't have any project.</p>
    }

    return (
        <div>
            <div className='flex justify-between mb-6'>
                <h1 className='text-2xl font-semibold'>Projects</h1>
                <CreateProjectButon onCreate={() => refetch()} />
            </div>
            {content}
        </div>
    );
};

export default ProjectScreen;
