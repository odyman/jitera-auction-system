import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    apiPutUserBalance,
} from '@/services/AuthService'

import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    userID?: number
    avatar?: string
    username?: string
    email?: string
    balance?: number
    authority?: string[]
}

const initialState: UserState = {
    userID: 0,
    avatar: '',
    username: '',
    email: '',
    balance: 0,
    authority: [],
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.userID = action.payload?.userID
            state.avatar = action.payload?.avatar
            state.email = action.payload?.email
            state.username = action.payload?.username
            state.balance = action.payload?.balance
            state.authority = action.payload?.authority
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
