import { useCallback } from 'react'
import Button from '@/components/ui/Button'
import {
    toggleTradeDialog,
    setSelectedRow,
    useAppDispatch,
    Row,
} from '../store'

const ActionColumn = ({ row }: { row: Row }) => {
    const dispatch = useAppDispatch()

    const onBid = useCallback(() => {
        dispatch(toggleTradeDialog(true))
        dispatch(setSelectedRow(row))
    }, [dispatch, row])

    return (
        <div className="ltr:text-right rtl:text-left">
            <Button size="sm" onClick={onBid}>
                Bid
            </Button>
        </div>
    )
}

export default ActionColumn
