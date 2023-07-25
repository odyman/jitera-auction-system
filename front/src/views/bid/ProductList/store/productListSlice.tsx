import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetProducts,
    apiUpdateProduct,
    apiDeleteProducts,
} from '@/services/BidService'
import type { TableQueries } from '@/@types/common'

type Product = {
    productID: number
    name: string
    duration: string
    price: number
    completed: number
}

type Products = Product[]

type GetProductsResponse = {
    data: Products
    total: number
}

type FilterQueries = {
    name: string
    completed: number[]
}

export type ProductListState = {
    loading: boolean
    publishConfirmation: boolean
    deleteConfirmation: boolean
    selectedProduct: number
    tableData: TableQueries
    filterData: FilterQueries
    productList: Product[]
}

type GetProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'bidProductList'

export const getProducts = createAsyncThunk(
    SLICE_NAME + '/getProducts',
    async (data: GetProductsRequest) => {
        const response = await apiGetProducts<
            GetProductsResponse,
            GetProductsRequest
        >(data)
        return response.data
    }
)

export const publishProduct = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiUpdateProduct<T, U>(data)
    return response.data
}

export const deleteProduct = async (data: { productID: number | number[] }) => {
    const response = await apiDeleteProducts<
        boolean,
        { productID: number | number[] }
    >(data)
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    }
}

const initialState: ProductListState = {
    loading: false,
    publishConfirmation: false,
    deleteConfirmation: false,
    selectedProduct: 0,
    productList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        completed: [1, 2],
    }
}

const productListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.productList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        togglePublishConfirmation: (state, action) => {
            state.publishConfirmation = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.productList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    updateProductList,
    setTableData,
    setFilterData,
    togglePublishConfirmation,
    toggleDeleteConfirmation,
    setSelectedProduct,
} = productListSlice.actions

export default productListSlice.reducer
