import {AxiosResponse} from 'axios'
import $api from '../http'
import { AuthResponse } from '../models/response/AuthResponse'
import { IUser } from '../models/IUser'

export default class UserService{
    static async fetchUsers() : Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}