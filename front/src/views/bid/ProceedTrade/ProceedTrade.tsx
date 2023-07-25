import ProceedBid, { ProceedBidProps } from './components/ProceedBid'

type ProceedTrade =
    ProceedBidProps & {
        type?: 'BID'
    }

const ProceedTrade = (props: ProceedTrade) => {
    const { type } = props

    return (
        <>
            {type === 'BID' && <ProceedBid {...props} />}
        </>
    )
}

export default ProceedTrade
