'use client'

import {Project} from "@/model/project";

export const createProject = async (projectData: Project) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
    })
}

export const getProjects = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const getProjectTasks = async (projectId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}/task`, {
        method: 'GET',
        credentials: 'include',
        headers: {}
    })
}

export const getProjectMembers = async (projectId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}/member`, {
        method: 'GET',
        credentials: 'include',
        headers: {}
    })
}

export const addProjectMember = async (data: {email: string, role: string}, projectId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}/member`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export const editProjectMember = async (userId: string, role: string, projectId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}/member/${userId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({role})
    })
}

export const deleteProjectMember = async (projectId: string, userId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project/${projectId}/member/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}