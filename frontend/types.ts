export interface User {
  id: string
  username: string
  avatar_url: string
  is_following?: boolean
  posts?: Post[]
}

export interface Post {
  id: string
  text: string
  image_url: string
  created_at: string
  user: User
}

export interface LoginResponse {
  token: string;
}