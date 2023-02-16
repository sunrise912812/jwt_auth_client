import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export const API_URL = process.env.REACT_APP_API_URL

const $api = axios.create({
    withCredentials : true, //Для того чтобы к кажому запросу куки цеплялись автоматически
    baseURL : API_URL
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config)=>{
    return config
},async (error)=>{ //Второй колбэк вызывается если произошла ошибка
    const originalRequest = error.config //Получаем запрос в случае которого произошла ошибка
    if(error.response.status == 401 && error.config && !originalRequest._isRetry){ //Проверяем существует ли конфиг а также проверем первый раз ли повторятся запрос(_isRetry поля нет если запрос в первый раз выполняется) чтобы не зациклились запросы
        originalRequest._isRetry = true
        try{
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials : true}) //Если произошла ошибка то обновляем токен
            localStorage.setItem('token', response.data.accsesToken)
            return $api.request(originalRequest)//Повторяем запрос с уже перезаписанным токеном
        }
        catch(e){
            console.log('Не авторизован...')
        }
    }
    throw error //Поднимем ошибку если у ошибка статус не 401
})

export default $api