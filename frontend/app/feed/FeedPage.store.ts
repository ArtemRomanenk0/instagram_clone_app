import { action, makeAutoObservable } from "mobx";


import { IPost } from "../types/types";
import api from "../scr/lib/api";
import { RootStore } from "../scr/lib/store/RootStore";


export class FeedPageStore {
    posts: IPost[] | null = null;
    error: string | null = null;
    isLoading: boolean = false;
    isError: boolean = false;
    showNewPost: boolean = false;

    constructor(public rootStore?: RootStore) {
        makeAutoObservable(this)
    }

    fetchPosts = action(async () => {
        this.isLoading = true;
        try {
            const res = await api.get<IPost[]>('/api/v1/posts')
            this.posts = res.data.reverse();
            this.isLoading = false
        } catch (err) {
            this.isError = true;
            this.error = 'Не удалось загрузить ленту'
            console.error('Error fetching posts:', err)
        }
    })

    setShowNewPost = (bool: boolean) => {
        this.showNewPost = bool;
    }
}