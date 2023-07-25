import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetBidData, apiUpdateProduct } from '@/services/BidService'
import type { TableQueries } from '@/@types/common'

export type Ongoing = {
    productID: number
    name: string
    duration: number
    price: number
    completed: number
}

export type Completed = {
    productID: number
    name: string
    duration: number
    price: number
    completed: number
}

export type Row = Ongoing | Completed

type BidData = Ongoing[] | Completed[]

type GetBidDataRequest = {
    tab: string
} & TableQueries

type GetBidDataResponse = {
    data: BidData
    total: number
}

export type BidState = {
    loading: boolean
    bidData: BidData
    tableData: TableQueries
    selectedTab: string
    tradeDialogOpen: boolean
    selectedRow: Partial<Row>
}

export const SLICE_NAME = 'ongoingBid'

export const getBidData = createAsyncThunk(
    SLICE_NAME + '/getBidData',
    async (data: GetBidDataRequest) => {
        const response = await apiGetBidData<
            GetBidDataResponse,
            GetBidDataRequest
        >(data)
        return response.data
    }
)

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

const initialState: BidState = {
    loading: true,
    bidData: [],
    tableData: initialTableData,
    selectedTab: 'ongoing',
    tradeDialogOpen: false,
    selectedRow: {},
}

const bidSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setSelectedTab: (state, action) => {
            state.selectedTab = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setBidData: (state, action) => {
            state.bidData = action.payload
        },
        toggleTradeDialog: (state, action) => {
            state.tradeDialogOpen = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBidData.fulfilled, (state, action) => {
                state.loading = false
                state.tableData.total = action.payload.total
                state.bidData = action.payload.data
            })
            .addCase(getBidData.pending, (state) => {
                state.loading = true
            })
    },
})

export const updateBidPrice = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiUpdateProduct<T, U>(data)
    return response.data
}

export const {
    setSelectedTab,
    setTableData,
    setBidData,
    toggleTradeDialog,
    setSelectedRow,
} = bidSlice.actions

export default bidSlice.reducer
