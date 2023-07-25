import Button from '@/components/ui/Button'
import { HiCheckCircle } from 'react-icons/hi'

type SuccessProps = {
    onDone: (done: boolean) => void
}

const Success = (props: SuccessProps) => {
    const { onDone } = props

    return (
        <>
            <div className="text-center my-10">
                <HiCheckCircle className="text-[70px] text-emerald-500 mx-auto" />
                <h4 className="mt-4 font-bold mb-2">Bidding placed</h4>
                <p>Please wait up to 5 second for next bidding.</p>
            </div>
            <div className="mt-8">
                <Button
                    block
                    className="mb-2"
                    variant="solid"
                    onClick={() => onDone(true)}
                >
                    Done
                </Button>
            </div>
        </>
    )
}

export default Success
