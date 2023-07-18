import { createContext, useContext } from 'react'
import { SIZES } from '../utils/constants'
import type { TypeAttributes, ColorLevel } from '../@types/common'

export type Config = {
    themeColor: string
    primaryColorLevel: ColorLevel
    cardBordered: boolean
    controlSize: TypeAttributes.ControlSize
}

export const defaultConfig = {
    themeColor: 'sky',
    primaryColorLevel: 600,
    cardBordered: false,
    controlSize: SIZES.MD,
} as const

export const ConfigContext = createContext<Config>(defaultConfig)

const ConfigProvider = ConfigContext.Provider

export const ConfigConsumer = ConfigContext.Consumer

export function useConfig() {
    return useContext(ConfigContext)
}

export default ConfigProvider
