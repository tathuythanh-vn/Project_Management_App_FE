export const getMe = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const getMeFull = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me/full`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}