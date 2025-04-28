export interface IPost {
  id: string;
  text: string;
  image_url?: string;
  created_at: string;
  user: IUser;
  likes_count: number;
  is_liked: boolean;
  like_id?: string;
  comments: IComment[];
  comments_count: number;
}

export interface IUser {
  id: string;
  username: string;
  avatar_url?: string;
  is_following?: boolean;
  followers_count: number;
  posts?: IPost[];
}

export interface IComment {
  id: string;
  text: string;
  created_at: string;
  user: IUser;
}

export interface IPost {
  id: string;
  likes_count: number;
  is_liked: boolean;
  comments: IComment[];
}