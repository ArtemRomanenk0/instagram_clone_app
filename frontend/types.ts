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
  image_url?: string
  created_at: number
  user: {
    id: string
    username: string
    avatar_url?: string
    is_following?: boolean
  }
}

export interface FeedProps {
  endpoint: string
  showFollowButton?: boolean
  showDeleteButton?: boolean
}

export interface LoginResponse {
  token: string;
}