export const getAssets = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/asset`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}