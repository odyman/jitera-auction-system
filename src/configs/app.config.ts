export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/app/bid/home',
    unAuthenticatedEntryPath: '/sign-in',
    enableMock: true,
}

export default appConfig
