import Button from '@/components/ui/Button'
import { NumericFormat } from 'react-number-format'
import Success from './Success'
import Failed from './Failed'

export type ProceedBidProps = {
    amount?: number
    status?: 'SUCCESS' | 'FAILED' | ''
    loading?: boolean
    onConfirm: () => void
    onDone: (done?: boolean) => void
}

const ProceedBid = (props: ProceedBidProps) => {
    const {
        amount = 0,
        status,
        loading,
        onConfirm,
    } = props

    return (
        <div className="mt-4">
            {status === 'SUCCESS' && <Success {...props} />}
            {status === 'FAILED' && <Failed {...props} />}
            {!status && (
                <>
                    <div className="text-center my-8">
                        <p className="mb-2">You will bid</p>
                        <h3 className="font-bold">
                            <NumericFormat
                                value={amount}
                                displayType="text"
                                suffix=" USD"
                                thousandSeparator={true}
                                allowNegative={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                            />
                        </h3>
                    </div>
                    <Button
                        block
                        className="mt-6"
                        variant="solid"
                        loading={loading}
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </>
            )}
        </div>
    )
}

export default ProceedBid
