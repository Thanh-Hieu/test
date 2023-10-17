import { appAxios } from "../configs"
import { IUser } from "../models"

const API_URL = {
    GET_BY_TOKEN: '/auth/me',
    LOGIN: 'auth/login',
}

class UserService {
    
    public static getByToken = async (
        params: any
    ) => {
        return appAxios.get<IUser>(API_URL.GET_BY_TOKEN, params)
    }

    
    public static login = async (
        body: {username: string, password: string}
    ) => {
        return appAxios.post<{access_token: string}>(API_URL.LOGIN, body)
    }

}

export { UserService }
