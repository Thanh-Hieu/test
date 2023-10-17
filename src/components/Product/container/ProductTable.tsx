import React from 'react'
import { ColumnsType } from 'antd/lib/table'
import { IProduct } from '../../../models'
import styled from 'styled-components'
import { Table } from 'antd'

interface ProductTableProps {
    readonly data: IProduct[]
    fetching: boolean
}

export const TableStyled = styled(Table)`
    /* &:where(.css-dev-only-do-not-override-1jyprxx).ant-table-wrapper
        .ant-table-thead
        > tr
        > th {
        background: #1a1a1a !important;
        color: #666666;
    }
    .ant-table-cell {
        border-bottom: none !important;
        background: #1a1a1a !important;
        border-top: none !important;
        border-radius: 0 !important;

        &::before {
            display: none;
        }
    }

    .ant-table-cell-row-hover {
        background: #292929 !important;
    }
    .ant-table-cell {
        color: #ffffff !important;
    } */
`

export function ProductTable(props: ProductTableProps) {
    const { data = [], fetching = false } = props

    let columns: ColumnsType<Partial<IProduct>> = [
        {
            title: 'No.',
            dataIndex: '_id',
            render: (order, record, index) => {
                return <span>{0 + index + 1}</span>
            },
            align: 'center',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
    ]

    return (
        <TableStyled
            dataSource={data}
            columns={columns}
            pagination={false}
            loading={fetching}
        />
    )
}
