'use client'

import ProjectCard from '@/components/project/project-card';
import CreateProjectButon from "@/components/form/create-project-btn";
import {getProjects} from "@/service/project";
import {Project} from "@/model/project";
import {useEffect, useState} from "react";

const ProjectScreen = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const {projects, error} = await getProjects();

                if (error) {
                    setError(error)
                }
                setProjects(projects);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, [])

    // Show loading state
    if (loading) {
        return (
            <div>
                <div className='flex justify-between mb-6'>
                    <h1 className='text-2xl font-semibold'>Projects</h1>
                    <CreateProjectButon/>
                </div>
                <p className='text-lg'>Loading projects...</p>
            </div>
        );
    }

    if (projects?.length === 0) {
        return (<div>
            <div className='flex justify-between mb-6'>
                <h1 className='text-2xl font-semibold'>Projects</h1>
                <CreateProjectButon/>
            </div>
            <p className='text-lg'>You don't have any project. Create one!</p>
        </div>)
    }

    if (error) {
        return <div className='text-center text-2xl'>
            {error}
        </div>
    }

    return (
        <div>
            <div className='flex justify-between mb-6'>
                <h1 className='text-2xl font-semibold'>Projects</h1>
                <CreateProjectButon/>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {projects?.map((project: Project) => (
                    <ProjectCard key={project._id} {...project}/>
                ))}
            </div>
        </div>
    );
};

export default ProjectScreen;
