const BASE_URL = 'http://localhost:8080';

export async function register(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        
        if (!response.ok) throw new Error('Registration failed');
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }
}
export async function login(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();
        if (data.token) localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        return { success: false, message: error.message };
    }
}


export async function addMediaToList(listType, mediaId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/media/${mediaId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({listType})
    });
    if (!response.ok) throw new Error('Failed to add media to list');
    return response.json();
}

export async function removeMediaFromList(listName, mediaId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/media/${mediaId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error('Failed to remove media from list');
    return { success: true };
}

export async function getMediaForList(listType) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/lists/${listType}/items`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to get media for list');
    return response.json();
}


export const createMedia = async (media) => {
    try {
        const response = await authFetch(`${BASE_URL}/media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(media),
        });
        return await response.json();
    } catch (error) {
        return { success: false, message: error.message };
    }

    };


    export const getLists = async () => {
        try {
            const response = await authFetch(`${BASE_URL}/lists`);
            return await response.json();
        } catch {
            return []
        }
    }

    export async function authFetch(url, options = {}) {
        const token = localStorage.getItem('token');
        const headers = { ...(options.headers || {})
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const response = await fetch(url, { ...options, headers });
        if (!response.ok) throw new Error('Unauthorized');
        return response;
    }

    export async function fetchLists() {
        try {
            const response = await authFetch(`${BASE_URL}/lists`);
            return await response.json();
        } catch (error) {
            return {success: false, message: error.message};
        }
    }
