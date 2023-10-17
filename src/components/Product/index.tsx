import React, { useEffect, useState } from 'react'
import { Pagination, Select, message } from 'antd'
import { ICategory, IProduct } from '../../models'
import { CategoryService, ProductService } from '../../services'
import styled from 'styled-components'
import { ProductTable } from './container'
import axios from 'axios'

export const SelectStyled = styled(Select)`
    height: 40px !important;
    .ant-select-selector {
        border-radius: 8px !important;
        height: 40px !important;
        padding-top: 4px !important;
    }
`

export function Product() {
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState<IProduct[]>([])
    const [categories, setCategories] = useState<ICategory[]>([])
    const [params, setParams] = useState({
        category: '',
        skip: 0,
        limit: 20,
    })
    const [fetching, setFetching] = useState<boolean>(false)

    const fetchResource = async () => {
        try {
            setFetching(true)
            const [productRes, categoryRes] = await Promise.all([
                ProductService.getAll({limit: params.limit, skip: params.skip}),
                CategoryService.getAll({}),
            ])
            setFetching(false)
            if (productRes.products &&  categoryRes.categories) {
                setProducts(productRes.products)
                setCategories(categoryRes.categories)
                setTotal(productRes.summary.count);
            }
        } catch (err) {
            message.error('An error occurred in the process data')
            setFetching(false)
        }
    }
    console.log({categories});

    const fetchProductByCategory = async () => {
        if(!params.category){
            return;
        }
        try {
            setFetching(true)
            const productsRes = await ProductService.getByCategory(params)
            if(productsRes.products){
                setProducts(productsRes.products);
            }
            setFetching(false)
            
        } catch (err) {
            message.error('An error occurred in the process data')
            setFetching(false)
        }
    }

    useEffect(() => {
        fetchResource();
    }, [])

    useEffect(() => {
        fetchProductByCategory();
    }, [params])

    const caterogyOptions = categories.map((o) => ({
        label: o.category,
        value: o.category,
    }));

    const productOptions = products.map((o) => ({
        label: o.name,
        value: o.id,
    }))

    return (
        <div className="w-full h-full">
                <div className="w-full bg-white p-6">
                    <p className="text-[30px] font-bold text-[#131416]">
                        Email submit
                    </p>
                </div>

                <div className="p-6 flex justify-between">
                    <div className="bg-white w-full rounded-lg px-4 pt-2 pb-6">
                    <div className="border border-solid border-[#EBEBEC] w-full">
                        <div className="p-4">
                                <div className="flex mb-6">
                                    <SelectStyled
                                        style={{ width: 250 }}
                                        onChange={(value) => {
                                            setParams((prev) => ({
                                                ...prev,
                                                category: value as string,
                                            }))
                                        }}
                                        options={caterogyOptions}
                                        className="w-[250px] ml-6"
                                        suffixIcon={
                                            <img
                                                src="/statics/icons/filter.svg"
                                                alt="icon"
                                                className='w-[24px] h-[24px]'
                                            />
                                        }
                                        placeholder="All Categories"
                                    />
                                    {/* <SelectStyled
                                        style={{ width: 250 }}
                                        onChange={(value) => {
                                            setParams((prev) => ({
                                                ...prev,
                                                product: value as string,
                                            }))
                                        }}
                                        options={productOptions}
                                        className="w-[250px] ml-6"
                                        suffixIcon={
                                            <img
                                                src="/statics/icons/filter.svg"
                                                className='w-[24px] h-[24px]'
                                                alt="icon"
                                            />
                                        }
                                        placeholder="All Products"
                                    /> */}
                                </div>
                            <ProductTable
                                data={products}
                                fetching={fetching}
                            />
                            <div className="flex justify-center mt-6">
                                <Pagination
                                    current={params.skip/ params.limit}
                                    total={total}
                                    pageSize={params.limit}
                                    onChange={(page: number, pageSize: number) => {
                                        setParams((prev) => ({
                                            ...prev,
                                            skip: page * params.limit,
                                            limit: pageSize
                                        }))
                                    }}
                                    // showSizeChanger={false}
                                />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    )
}

export * from './container'

