import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8 text-left">
                <h3 className="mb-1">Login</h3>
                <p>Jitera - Auction System</p>
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
