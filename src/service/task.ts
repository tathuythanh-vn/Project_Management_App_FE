import {Task, TaskFormInput} from "@/model/task";

export const createTask = async (data: TaskFormInput) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export const getTasks = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const getTask = async (taskId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {}
    })
}

export const updateTask = async (taskId: string, data: Task) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`, {
        method: 'PATCH',
        credentials: 'include',
    })
}

export const deleteTask = async (taskId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`, {
        method: 'DELETE',
    })
}

export const getSubtasks = async (taskId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}/subtask`, {
        method: 'GET',
        credentials: 'include',
        headers: {}
    })
}

export const createSubtask = async (taskId: string, data: Task) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}/subtask`, {
        method: 'POST',
        credentials: 'include',
    })
}

export const updateSubtask = async (taskId: string, subtaskId: string, data: Task) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}/subtask/${subtaskId}`, {
        method: 'PATCH',
    })
}
