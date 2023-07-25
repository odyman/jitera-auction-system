import { createSlice } from '@reduxjs/toolkit'
import { themeConfig } from '@/configs/theme.config'
import type {
    LayoutType,
    ColorLevel,
} from '@/@types/theme'

export type ThemeState = {
    themeColor: string
    primaryColorLevel: ColorLevel
    cardBordered: boolean
    layout: {
        type: LayoutType
        previousType?: LayoutType
    }
}

const initialState: ThemeState = {
    themeColor: themeConfig.themeColor,
    primaryColorLevel: themeConfig.primaryColorLevel,
    cardBordered: themeConfig.cardBordered,
    layout: themeConfig.layout,
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setPreviousLayout: (state, action) => {
            state.layout.previousType = action.payload
        },
        setThemeColorLevel: (state, action) => {
            state.primaryColorLevel = action.payload
        },
    },
})

export const {
    setPreviousLayout,
    setThemeColorLevel,
} = themeSlice.actions

export default themeSlice.reducer
