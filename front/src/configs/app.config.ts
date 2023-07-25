export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'http://localhost:3001/api',
    authenticatedEntryPath: '/app/bid/home',
    unAuthenticatedEntryPath: '/sign-in',
    enableMock: false,
}

export default appConfig
