import ProductForm, {
    FormModel,
    SetSubmitting,
} from '@/views/bid/ProductForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { apiCreateProduct } from '@/services/BidService'

const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data: FormModel) => {
        const response = await apiCreateProduct<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        const { name, price, duration, publish, completed } = values
    
        const insertData = { name, price, duration: dayjs(duration).unix(), publish, completed }
        setSubmitting(true)
        const success = await addProduct(insertData)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Product successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/bid/product-list')
        }
    }

    const handleDiscard = () => {
        navigate('/app/bid/product-list')
    }

    return (
        <>
            <ProductForm
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew
