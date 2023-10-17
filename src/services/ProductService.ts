import { appAxios } from "../configs"
import { IProduct } from "../models"

const API_URL = {
    GET_All: '/catalog/products',
    GET_BY_CATEGORY: (category: string) => `/catalog/category/${category}/products`
}

export type ProductResponse = {products: IProduct[]; summary: {count: number}};

class ProductService {
    public static getAll = async (
        params: {limit: number; skip: number}
    ) => {
        return appAxios.get<ProductResponse>(
            API_URL.GET_All,
            params
        )
    }

    public static getByCategory = async (
        params: {limit: number, skip: number, category: string}
    ) => {
        return appAxios.get<ProductResponse>(API_URL.GET_BY_CATEGORY(params.category), params)
    }
}

export { ProductService }
