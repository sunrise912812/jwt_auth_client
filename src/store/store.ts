import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import { AxiosError } from "axios";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store{
    user = {} as IUser
    isAuth = false
    isLoading = false

    constructor(){
        makeAutoObservable(this)
    }

    setIsAuth(bool : boolean){
        this.isAuth = bool
    }

    setUser(user : IUser){
        this.user = user
    }

    setIsLoading(bool : boolean){
        this.isLoading = bool
    }

    async login(email : string, password : string){
        try{
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accsesToken)
            this.setIsAuth(true) //Меняем флаг авторизации на true
            this.setUser(response.data.user)
        }
        catch(e: unknown){
            const err = e as AxiosError
            console.log(err.message) //? - добавляем для того чтобы проверить есть ли поля response и data ессли есть то выводим сообщение с ошибкой которое пришло с сервера
        }
    }

    async registration(email : string, password : string){
        try{
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accsesToken)
            this.setIsAuth(true) //Меняем флаг авторизации на true
            this.setUser(response.data.user)
        }
        catch(e: unknown){
            const err = e as AxiosError
            console.log(err.message)
        }
    }

    async logout(){
        try{
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            this.setIsAuth(false)
            this.setUser({} as IUser)
        }
        catch(e: unknown){
            const err = e as AxiosError
            console.log(err.message)
        }

    }

    async checkAuth(){
        this.setIsLoading(true)
        try{
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials : true}) //Указываем что автоматически будут отправлены куки
            localStorage.setItem('token', response.data.accsesToken)
            this.setIsAuth(true) //Меняем флаг авторизации на true
            this.setUser(response.data.user)
        }
        catch(e: unknown){
            const err = e as AxiosError
            console.log(err.message)
        }
        finally{
            this.setIsLoading(false)
        }
    }
}