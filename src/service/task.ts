import {Subtask, Task, TaskFormInput} from "@/model/task";

export const createTask = async (data: TaskFormInput, formData?: FormData) => {
    // If formData is provided (with files), use it
    if (formData) {
        // Add the task data to the existing formData
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value.toString());
            }
        });

        return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task`, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        });
    } else {
        // If no files, use the original JSON approach
        return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
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

export const updateTask = async (taskId: string, data: Partial<Task>) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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

export const addSubtask = async (taskId: string, data: Partial<Subtask>) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}/subtask`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export const updateSubtask = async (taskId: string, subtaskId: string, data: Partial<Subtask>) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}/subtask/${subtaskId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export const deleteSubtask = async (taskId: string, subtaskId: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}/subtask/${subtaskId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}
