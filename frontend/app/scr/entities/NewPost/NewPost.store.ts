import { makeAutoObservable } from "mobx";

import { ChangeEvent, FormEvent } from "react";
import api from "../../lib/api";
import { RootStore } from "../../lib/store/RootStore";

export class NewPostStore {
  text: string | any = '';
  image: File | null | undefined = null;
  isLoading: boolean = false;
  reqStatus: number | null = null;

  constructor(public rootStore?: RootStore) {
    makeAutoObservable(this)
  }

  handleChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    this.text = event.target.value;
  }

  handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    this.image = event.target.files?.[0];
  }

  submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('text', this.text);
      if (this.image) formData.append('image', this.image);

      this.isLoading = true;
      const res = await api.post('/api/v1/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.status === 201) {
        this.text = '';
        this.image = null;
        this.reqStatus = res.status;
        window.location.reload()
      }
    } catch (error) {
      console.error('Error:', error);
      this.reqStatus = 500;
    } finally {
      this.isLoading = false;
    }
  }
}