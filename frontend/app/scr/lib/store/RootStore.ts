// stores/RootStore.ts

import { UsersPageStore } from "@/app/users/UsersPage.store";
import { FeedStore } from "../../entities/Feed/Feed.store";
import { FeedPageStore } from "@/app/feed/FeedPage.store";
import { NewPostStore } from "../../entities/NewPost/NewPost.store";
import { AuthStore } from "@/app/users/[id]/AuthStore";



export class RootStore {
    feedStore: FeedStore;
    usersPageStore: UsersPageStore;
    feedPageStore: FeedPageStore;
    newPostStore: NewPostStore;
    authStore: AuthStore;

    constructor() {
        this.authStore = new AuthStore();
        this.feedStore = new FeedStore(this);
        this.usersPageStore = new UsersPageStore(this);
        this.feedPageStore = new FeedPageStore(this);
        this.newPostStore = new NewPostStore(this);
    }
}

export const rootStore = new RootStore();

export const useStore = () => rootStore;