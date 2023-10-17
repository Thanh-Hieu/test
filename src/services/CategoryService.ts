import { appAxios } from "../configs"
import { ICategory, IProduct } from "../models"

const API_URL = {
    GET_All: '/catalog/categories',
}


export type CategoryResponse = {categories: ICategory[]};

class CategoryService {
    public static getAll = async (
        params: any
    ) => {
        return appAxios.get<CategoryResponse>(
            API_URL.GET_All,
            params
        )
    }
}

export { CategoryService }
