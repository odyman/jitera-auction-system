import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetProducts,
    apiDeleteProducts,
} from '@/services/BidService'
import type { TableQueries } from '@/@types/common'

type Product = {
    id: string
    name: string
    duration: string
    price: number
    status: number
}

type Products = Product[]

type GetProductsResponse = {
    data: Products
    total: number
}

type FilterQueries = {
    name: string
    status: number[]
}

export type ProductListState = {
    loading: boolean
    deleteConfirmation: boolean
    selectedProduct: string
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

export const deleteProduct = async (data: { id: string | string[] }) => {
    const response = await apiDeleteProducts<
        boolean,
        { id: string | string[] }
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
    },
}

const initialState: ProductListState = {
    loading: false,
    deleteConfirmation: false,
    selectedProduct: '',
    productList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        status: [0, 1]
    },
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
    toggleDeleteConfirmation,
    setSelectedProduct,
} = productListSlice.actions

export default productListSlice.reducer
