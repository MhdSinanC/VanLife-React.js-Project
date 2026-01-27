export const apiFetch = async(url, token) => {
    return await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}