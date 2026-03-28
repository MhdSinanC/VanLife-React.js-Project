/**
 * apiFetch
 * ---------
 * Custom wrapper around fetch to handle:
 * - Attaching access token (Authorization header)
 * - Automatic token refresh on 401 (unauthorized)
 * - Retrying the original request after refreshing token
 *
 * @param {string} url - API endpoint
 * @param {string|null} token - Current access token
 * @param {function} setToken - Function to update token in context
 */

export const apiFetch = async (url, token, setToken) => {
    // Initial request with access token
    let res = await fetch(url, {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        },
        credentials: 'include'      // Send cookies (for refresh token)
    })

    // If access token is expired/invalid → try refreshing it
    if (res.status === 401) {
        try {
            const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
                credentials: 'include'
            })

            if (refreshRes.ok) {
                const data = await refreshRes.json()

                // Update token in global state
                setToken(data.token)

                // Retry original request with new token
                res = await fetch(url, {
                    headers: {
                        Authorization: data.token ? `Bearer ${data.token}` : ''
                    },
                    credentials: 'include'
                })
            }
            else {
                // Refresh token invalid → log user out
                setToken(null)
            }
        }
        catch (error) {
            console.error("Token refresh failed", error);
            setToken(null);
        }

    }

    return res;
}