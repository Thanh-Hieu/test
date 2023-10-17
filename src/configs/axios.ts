import { message } from 'antd'
import axios, { AxiosRequestConfig } from 'axios'
import { stringify } from 'qs'
import Cookies from 'js-cookie'

const axiosClient = axios.create({
    baseURL: 'https://mystoreapi.com'
})

axiosClient.interceptors.request.use(
    function (config) {
        config.headers['Content-Type'] =
            'application/json'
        const token = Cookies.get('token')
        if (
            typeof token !== 'undefined' &&
            token &&
            !config.url?.includes('X-Amz-Algorithm') 
        ) {
            if (config.headers) {
                config.headers['Authorization'] =
                    'Bearer ' + encodeURIComponent(token)
            }
        }
        return config
    },
    function (error) {
        return Promise.reject(error.message)
    }
)
axiosClient.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        if (
            !error?.config?.headers['Authorization'] ||
            error?.response?.status == '401'
        ) {
            localStorage?.clear()
            Cookies.remove('token')
            // location.href = '/login'
        }

        return Promise.reject(error)
    }
)

class AxiosFetch {
    get<T>(uri: string, params = {}) {
        const queryString = stringify(params)
        const uriWithQuery = `${queryString ? uri + '?' : uri}${queryString}`
        return axiosClient.get(uriWithQuery) as T
    }
    post<T>(uri: string, body: any) {
        return axiosClient.post(uri, body) as T
    }
    put<T>(
        uri: string,
        body: any,
        config: AxiosRequestConfig<any> | undefined
    ) {
        return axiosClient.put(uri, body, config) as T
    }
    delete(uri: string, body: AxiosRequestConfig<any> | undefined) {
        return axiosClient.delete(uri, body)
    }
    patch(uri: string, body: any) {
        return axiosClient.patch(uri, body)
    }
}

export const appAxios = new AxiosFetch()
