const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function registerUser(userData) {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Fail while registering user');
  }

  return response;
}
