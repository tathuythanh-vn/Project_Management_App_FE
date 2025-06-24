import {TaskFormInput} from "@/model/task";
import {TeamFormInput} from "@/model/team";

export const createTeam = async (data: TeamFormInput) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export const getTeams = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const getTeam = async (id: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const getTeamMembers = async (id: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/${id}/member`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const addTeamMember = async (data: {email: string, role: string}, teamId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/${teamId}/member`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export const editTeamMember = async (userId: string, role: string, teamId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/${teamId}/member/${userId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({role})
    })
}

export const deleteTeamMember = async (teamId: string, userId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/${teamId}/member/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}
