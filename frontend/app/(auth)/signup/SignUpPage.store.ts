import { ChangeEvent, FormEvent } from "react";
import axios from "axios";

import { makeAutoObservable } from "mobx";

export class SignUpPageStore {
    username: string = '';
    email: string = '';
    password: string = '';

    constructor() {
        makeAutoObservable(this)
    }

    handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        this.username = e.target.value;
        console.log(this.username)
    }

    handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        this.email = e.target.value;
        console.log(this.email)
    }

    handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        this.password = e.target.value;
        console.log(this.password)
    }

    submit = async (e: FormEvent<HTMLFormElement>, onSuccess: () => void) => {
        e.preventDefault()

        const email = this.email;
        const password = this.password;
        const username = this.username;

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signup`,
                { user: { email: this.email, password: this.password, username: this.username } }
            );
            console.log(res)
            if (res.status === 201) {
                localStorage.setItem('authToken', res.data.token);
                await new Promise(resolve => setTimeout(resolve, 100));
                window.dispatchEvent(new CustomEvent('authChange')); 
                onSuccess();
            }
        }
        catch (e) {
            alert('Ошибка регистрации!');
        }
    }
}