import { IPost, IUser } from "@/app/types/types";
import { action, makeAutoObservable } from "mobx";
import api from "../../lib/api";
import { RootStore } from "../../lib/store/RootStore";



export class FeedStore {
  posts: IPost[] | null = null;
  user: IUser | null = null;
  error: string | null = null;
  isLoading: boolean = false;


  constructor(public rootStore?: RootStore) {
    makeAutoObservable(this)
  }



  updateUserInPosts = action((updatedUser: IUser) => {
    this.posts = this.posts?.map(post => {
      if (post.user.id === updatedUser.id) {
        return {
          ...post,
          user: {
            ...post.user,
            ...updatedUser
          }
        };
      }
      return post;
    }) ?? null;
  });

  fetchPosts = action(async (endpoint: string) => {
    this.isLoading = true;
    try {
      const res = await api.get<IPost[]>(endpoint);
      this.posts = res.data;
      this.error = null;
    } catch (error) {
      console.error('Fetch error:', error);
      this.error = 'Ошибка загрузки';
      this.posts = [];
    } finally {
      this.isLoading = false;
    }
  })

  addNewPost = action((post: IPost) => {
    if (this.posts) {
      this.posts.unshift(post);
    } else {
      this.posts = [post];
    }
  });

  toggleLike = action(async (postId: string) => {
    const post = this.posts?.find(p => p.id === postId);
    if (!post) return;

    try {
      if (post.is_liked) {

        if (!post.like_id) throw new Error("Like ID не найден");
        await api.delete(`/api/v1/posts/${postId}/likes/${post.like_id}`);
        post.likes_count--;
        post.is_liked = false;
      } else {
        const res = await api.post(`/api/v1/posts/${postId}/likes`);
        post.likes_count = res.data.likes_count;
        post.is_liked = true;
        post.like_id = res.data.like_id;
      }
    } catch (error) {
      console.error('Ошибка лайка:', error);
    }
  })

  addComment = action(async (postId: string, text: string) => {
    try {
      const res = await api.post(`/api/v1/posts/${postId}/comments`, {
        comment: { text }
      });
      const post = this.posts?.find(p => p.id === postId);
      if (post) {

        res.data.user = this.user;
        post.comments = [res.data, ...(post.comments || [])];
      }
    } catch (error) {
      console.error('Comment error:', error);
    }
  })

  searchPosts = action(async (query: string) => {
    this.isLoading = true;
    try {
      const res = await api.get<IPost[]>(`/api/v1/search/posts?query=${encodeURIComponent(query)}`);
      this.posts = res.data;
      this.error = null;
    } catch (error) {
      console.error('Search error:', error);
      this.error = 'Ошибка поиска';
      this.posts = [];
    } finally {
      this.isLoading = false;
    }
  })

  clearSearch = action(() => {
    this.posts = null;
    this.fetchPosts('/api/v1/posts');
  })

  fetchCurrentUser = action(async () => {
    try {
      const { data } = await api.get('/api/v1/users/me')
      this.user = data
    } catch (err) {
      console.error('Error fetching current user:', err)
    }
  })

  
  handleFollow = action(async (targetUserId: string) => {
    try {
      const post = this.posts?.find(p => p.user.id === targetUserId);
      if (!post) return;

      const endpoint = post.user.is_following
        ? `/api/v1/users/${targetUserId}/unfollow`
        : `/api/v1/users/${targetUserId}/follow`;

      const { data } = await api.post<{ target_user: IUser }>(endpoint);

      this.posts = (this.posts || []).map(p => {
        if (p.user.id === data.target_user.id) {
          return { ...p, user: data.target_user };
        }
        return p;
      });

    } catch (error) {
      console.error('Ошибка подписки:', error);
    }
  });

  handleDelete = action(async (postId: string, onPostDelete?: () => void) => {
    try {
      this.isLoading = true;
      await api.delete(`/api/v1/posts/${postId}`);


      this.posts = this.posts?.filter(post => post.id !== postId) || null;


      onPostDelete?.();
    } catch (error) {
      console.error('Delete error:', error);
      this.error = 'Ошибка при удалении';
    } finally {
      this.isLoading = false;
    }
  })
}