// app/user/[id]/page.tsx
import UserPage from "./UserPage"

export async function generateStaticParams() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) throw new Error('API URL is not defined')
    
    const response = await fetch(`${apiUrl}/api/v1/users`)
    if (!response.ok) throw new Error('Failed to fetch users')
    
    const users = await response.json()
    return users.map((user: { id: string }) => ({
      id: user.id.toString()
    }))
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    return []
  }
}

export default UserPage