export type SignInCredential = {
    username: string
    password: string
}

export type SignInResponse = {
    token: string
    user: {
        userID: number
        username: string
        avatar: string
        email: string
        balance: number
        authority: string[]
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    username: string
    email: string
    password: string
}
