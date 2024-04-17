const API_BASE_URL = 'http://localhost:3000/api/';

export async function registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error('Fail while registering user');
    }

    return response;
}
