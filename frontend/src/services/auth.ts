interface User {
  id: string
  name: string
  email: string
}

// Mock user for demonstration
const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'user@example.com'
}

// Simple mock authentication
export async function signIn(
  email: string,
  password: string
): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))

  return true

  // In a real app, you would validate credentials against your backend
  if (email === 'user@example.com' && password === 'password') {
    // Store user in localStorage or cookies or context
    localStorage.setItem('user', JSON.stringify(MOCK_USER))
    return true
  }

  return false
}

export function signOut(): void {
  localStorage.removeItem('user')
}

export function getCurrentUser(): User | null {
  const userStr =
    typeof window !== 'undefined' ? localStorage.getItem('user') : null
  if (!userStr) return null

  try {
    return JSON.parse(userStr) as User
  } catch {
    return null
  }
}
