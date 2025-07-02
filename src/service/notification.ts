export const getNotification = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const getNotificationStats = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification/stats`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const markNotificationAsRead = async (id: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notification/${id}/read`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {}
    })
}