export const getActivities = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/action-log`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const getActivity = async (id: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/action-log/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}