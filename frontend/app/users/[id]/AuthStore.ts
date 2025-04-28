
import { action, makeAutoObservable } from "mobx";
import { IPost, IUser } from "@/app/types/types";
import api from "@/app/scr/lib/api";


export class AuthStore {
  currentUser: IUser | null = null;
  viewedUser: IUser | null = null;
  users = new Map<string, IUser>();

  constructor() {
    makeAutoObservable(this);
  }

  fetchCurrentUser = async () => {
    try {
      const { data } = await api.get<IUser>("/api/v1/users/me");
      this.currentUser = data;
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  fetchViewedUser = async (userId: string) => {
    try {
      const { data } = await api.get<{ user: IUser, posts: IPost[] }>(`/api/v1/users/${userId}`);
      this.viewedUser = data.user;
    } catch (error) {
      console.error("Error fetching viewed user:", error);
    }
  };

  updateUser = action((user: IUser) => {
    this.users.set(user.id, user);
  });
}
