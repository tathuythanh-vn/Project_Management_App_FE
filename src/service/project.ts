'use client'

import {Project} from "@/model/project";

export const createProject = async (projectData: Project) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }

        return {
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}

export const getProjects = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error('Projects not found');
        }

        const {projects}: { projects: Project[] } = await response.json();

        return {
            success: true,
            projects: projects || [],
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            projects: [],
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}