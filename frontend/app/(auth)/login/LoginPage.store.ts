import { makeAutoObservable } from "mobx";

import axios from "axios";
import { ChangeEvent, FormEvent } from "react";


export class LoginPageStore {
    email: string = '';
    password: string = '';
    statusReq: number = 0;

    constructor() {
        makeAutoObservable(this)
    }

    setEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        this.email = target.value;
    }

    setPassword = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        this.password = target.value;
    }

    submit = async (event: FormEvent<HTMLFormElement>, onSuccess: () => void) => {
        event.preventDefault();



        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
                { user: { email: this.email, password: this.password } }
            );
            console.log(res)

            if (res.status === 200 && res.data?.token) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('authToken', res.data.token);
                    window.dispatchEvent(new CustomEvent('authChange'));
                    onSuccess();
                }
                return;
            }
            throw new Error('Неверный формат ответа сервера');

        } catch (error) {
            alert('Ошибка входа! Проверьте данные');
        }
    }
}