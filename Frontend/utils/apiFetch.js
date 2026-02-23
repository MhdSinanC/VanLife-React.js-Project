export const apiFetch = async (url, token, setToken) => {

    let res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        credentials: 'include'
    })

    if (res.status === 401) {
        const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
            credentials: 'include'
        })

        if (refreshRes.ok) {
            const data = await refreshRes.json()
            setToken(data.token)

            //retry original request
            res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            })
        }
        else {
            setToken(null)
        }
    }


    return res;
}