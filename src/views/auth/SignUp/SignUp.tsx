import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8 text-left">
                <h3 className="mb-1">Register</h3>
                <p>Lets get started with Jitera auction system</p>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
