import { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import {
    toggleTradeDialog,
    setSelectedRow,
    useAppDispatch,
    useAppSelector,
    setTableData,
    updateBidPrice,
    
} from '../store'
import { updateUserBalance, setUser } from '@/store'
import TradeForm, { FormModel, FormBidHistoryModel } from '@/views/bid/TradeForm'
import ProceedTrade from '@/views/bid/ProceedTrade'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import { apiCreateBidHistory } from '@/services/BidService'

const TradeDialog = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const tradeDialogOpen = useAppSelector(
        (state) => state.ongoingBid.data.tradeDialogOpen
    )
    const selectedRow = useAppSelector(
        (state) => state.ongoingBid.data.selectedRow
    )
    const tableData = useAppSelector(
        (state) => state.ongoingBid.data.tableData
    )
    const user = useAppSelector(
        (state) => state.auth.user
    )

    const [showProceed, setShowProceed] = useState({})
    const [bidPrice, setBidPrice] = useState<number>(0)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [status, setStatus] = useState<'SUCCESS' | 'FAILED' | ''>('')

    const onDialogClose = () => {
        dispatch(toggleTradeDialog(false))
        setTimeout(() => {            
            dispatch(setSelectedRow({}))
            setShowProceed({})
            setConfirmLoading(false)
            setStatus('')
        }, 500)
    }

    const handleTrade = (
        values: FormModel,
        setSubmitting: (isSubmitting: boolean) => void,
        trade: 'BID'
    ) => {
        const { amount } = values
        const currPrice = selectedRow?.price ?? 0
        if(amount > currPrice){
            setSubmitting(true)
            setTimeout(() => {
                setBidPrice(amount)
                setShowProceed({ ...values, type: trade })
                setConfirmLoading(false)
                setStatus('')
            }, 500)
        }else{
            onDialogClose()
            toast.push(
                <Notification
                    title={'Bid Price'}
                    type="danger"
                    duration={3000}
                >
                    The bid price must be greater than ${amount}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    const addBidHisory = async () => {
        const insertData = { productID: selectedRow?.productID, userID: user?.userID, bidPrice: bidPrice }
        console.log('insertData:', insertData)
        const response = await apiCreateBidHistory<boolean, FormBidHistoryModel>(insertData)
        return response.data
    }

    const hadleConfirm = async () => {
        const clonedData = cloneDeep(selectedRow)
        const price = bidPrice
        const newData = { ...clonedData, price }
        // check balance 
        const currBalance = user?.balance ?? 0
        const restBalance = Math.floor(currBalance - bidPrice)
        if(restBalance <= 0){
            onDialogClose()
            toast.push(
                <Notification
                    title={'Insufficient Balance'}
                    type="danger"
                    duration={3000}
                >
                    Please topup your balance
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/bid/deposit')
        }else{
            const success = await updateBidPrice(newData)
            if (success) {
                // refresh table
                const newTableData = cloneDeep(tableData)
                dispatch(setTableData(newTableData))
                // deduct balance
                const clonedUserData = cloneDeep(user)
                const balance = Math.floor(currBalance - bidPrice)
                const newUserData = { ...clonedUserData, balance }
                // update user balance
                updateUserBalance(newUserData)
                dispatch(setUser(newUserData))
                // insert bid history
                addBidHisory()

                setConfirmLoading(true)
                setTimeout(() => {
                    setStatus('SUCCESS')
                }, 1000)
            }
        }
        
        
    }

    const handleDone = (shouldRedirect?: boolean) => {
        onDialogClose()
        if (shouldRedirect) {
            navigate('/app/bid/home')
        }
    }

    return (
        <Dialog
            isOpen={tradeDialogOpen}
            closable={!status}
            width={400}
            onRequestClose={onDialogClose}
            onClose={onDialogClose}
        >
            <h5 className="mb-4">
                {isEmpty(showProceed) &&
                    !status &&
                    `Bid ${selectedRow.name}`}
                {!isEmpty(showProceed) && !status && 'Bid preview'}
            </h5>
            {isEmpty(showProceed) ? (
                <TradeForm
                    amount={selectedRow.price as number}
                    onBid={(values, setSubmitting) =>
                        handleTrade(values, setSubmitting, 'BID')
                    }
                />
            ) : (
                <ProceedTrade
                    loading={confirmLoading}
                    status={status as 'SUCCESS' | 'FAILED' | ''}
                    onConfirm={hadleConfirm}
                    onDone={handleDone}
                    {...showProceed}
                />
            )}
        </Dialog>
    )
}

export default TradeDialog
