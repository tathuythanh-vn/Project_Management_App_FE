import {PublicUser, User} from "@/model/user";

export const getUsers = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const getUser = async (id: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const updateUser = async (id: string, data: Partial<PublicUser>) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const deleteUser = async (id: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const createUser = async (data: any) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export const hardDeleteUser = async (id: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}/permanent`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}