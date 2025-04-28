import { action, makeAutoObservable } from "mobx";
import { IPost, IUser } from "../types/types";
import api from "../scr/lib/api";
import { RootStore } from "../scr/lib/store/RootStore";

export class UsersPageStore {
  user: IUser | null = null;
  currentUser: IUser | null = null;
  posts: IPost[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(public rootStore?: RootStore) {
    makeAutoObservable(this);
  }

  syncUser = action((updatedUser: IUser) => {
    if (this.user?.id === updatedUser.id) {
      this.user = {
        ...this.user,
        is_following: updatedUser.is_following,
        followers_count: updatedUser.followers_count
      };
    }
  });

  fetchCurrentUser = action(async () => {
    try {
      this.isLoading = true;
      const { data } = await api.get<IUser>("/api/v1/users/me");
      this.currentUser = data;
    } catch (err) {
      console.error("Error fetching current user:", err);
    } finally {
      this.isLoading = false;
    }
  });

  fetchUser = action(async (userId: string) => {
    try {
      this.isLoading = true;
      const { data } = await api.get<{
        user: IUser;
        posts: IPost[];
      }>(`/api/v1/users/${userId}`);


      if (this.user?.id === data.user.id) {
        this.user = {
          ...this.user,
          ...data.user,
          posts: data.posts
        };
      } else {
        this.user = data.user;
        this.posts = data.posts;
      }

    } catch (err) {
      this.error = "Не удалось загрузить профиль";
    } finally {
      this.isLoading = false;
    }
  });


  handleFollow = action(async (targetUserId: string) => {


    try {
      if (!this.user || this.currentUser?.id === targetUserId) return;


      const wasFollowing = this.user.is_following;
      this.user.is_following = !wasFollowing;
      this.user.followers_count += wasFollowing ? -1 : 1;

      const endpoint = wasFollowing
        ? `/api/v1/users/${targetUserId}/unfollow`
        : `/api/v1/users/${targetUserId}/follow`;

      const { data } = await api.post<{ target_user: IUser }>(endpoint);
      if (this.user?.id === data.target_user.id) {
        this.user = data.target_user;
      }

    } catch (err) {

      if (this.user) {
        this.user.is_following = !this.user.is_following;
        this.user.followers_count += this.user.is_following ? 1 : -1;
      }
    }
  });
}