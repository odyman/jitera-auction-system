import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    apiPutUserBalance,
} from '@/services/AuthService'

import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    id?: string
    avatar?: string
    userName?: string
    email?: string
    authority?: string[]
    balance?: number
}

const initialState: UserState = {
    id: '',
    avatar: '',
    userName: '',
    email: '',
    authority: [],
    balance: 0
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.id = action.payload?.id
            state.avatar = action.payload?.avatar
            state.email = action.payload?.email
            state.userName = action.payload?.userName
            state.authority = action.payload?.authority
            state.balance = action.payload?.balance
        }
    },
})

export const updateUserBalance = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiPutUserBalance<T, U>(data)
    return response.data
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
