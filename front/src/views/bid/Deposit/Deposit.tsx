import DepositForm, {
    FormModel,
    SetSubmitting,
} from '@/views/bid/DepositForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { updateUserBalance, useAppSelector, useAppDispatch, setUser } from '@/store'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'

const Deposit = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const user = useAppSelector(
        (state) => state.auth.user
    )

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        const { amount } = values
        const clonedData = cloneDeep(user)
        const balance = amount
        const newData = { ...clonedData, balance }

        setSubmitting(true)
        const success = await updateUserBalance(newData)
        setSubmitting(false)
        if (success) {
            dispatch(setUser(newData))
            toast.push(
                <Notification
                    title={'Successfuly updated'}
                    type="success"
                    duration={2500}
                >
                    Deposit successfuly updated
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/bid/home')
        }
    }

    const handleDiscard = () => {
        navigate('/app/bid/home')
    }

    return (
        <>
            <DepositForm
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default Deposit
