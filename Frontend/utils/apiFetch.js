/**
 * apiFetch
 * ---------
 * Custom wrapper around fetch to handle:
 * - Attaching access token (Authorization header)
 * - Automatic token refresh on 401 (unauthorized)
 * - Retrying the original request after refreshing token
 * - Supports GET and POST (with JSON body)
 *
 * @param {string} url - API endpoint
 * @param {string|null} token - Current access token
 * @param {function} setToken - Function to update token in context
 * @param {object} options    - Optional: {method, body}
 */

export const apiFetch = async (url, token, setToken, options = {}) => {

    const { method = 'GET', body = null } = options;

    //Build the fetch config object
    const config = {
        method: method,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            ...(body ? { 'Content-Type': 'application/json' } : {})
        },
        credentials: 'include',
        ...(body ? { body: JSON.stringify(body) } : {})
    }

    // Initial request
    let res = await fetch(url, config);

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
                    ...config,
                    headers: {
                        ...config.headers,
                        Authorization: `Bearer ${data.token}`
                    }
                });
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