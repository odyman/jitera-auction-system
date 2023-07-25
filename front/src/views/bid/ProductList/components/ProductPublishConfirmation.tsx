import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    togglePublishConfirmation,
    publishProduct,
    getProducts,
    useAppDispatch,
    useAppSelector,
} from '../store'
// import cloneDeep from 'lodash/cloneDeep'

const ProductPublishConfirmation = () => {
    const dispatch = useAppDispatch()
    const dialogOpen = useAppSelector(
        (state) => state.bidProductList.data.publishConfirmation
    )
    const selectedProduct = useAppSelector(
        (state) => state.bidProductList.data.selectedProduct
    )
    const tableData = useAppSelector(
        (state) => state.bidProductList.data.tableData
    )
    const { userID } = useAppSelector(
        (state) => state.auth.user
    )

    const onDialogClose = () => {
        dispatch(togglePublishConfirmation(false))
    }

    const onPublish = async () => {
        dispatch(togglePublishConfirmation(false))
        const success = await publishProduct({ productID: selectedProduct, publish: 2 })

        // const clonedData = cloneDeep(selectedProduct)

        // const newData = { ...clonedData, publish: 2 }
        // const success = await publishProduct(newData)

        if (success) {
            dispatch(getProducts({ userID: userID, ...tableData }))
            toast.push(
                <Notification
                    title={'Successfuly Publish'}
                    type="success"
                    duration={2500}
                >
                    Product successfuly publish
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="info"
            title="Publish product"
            confirmButtonColor="sky-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onPublish}
        >
            <p>
                Are you sure you want to publish this product?
            </p>
        </ConfirmDialog>
    )
}

export default ProductPublishConfirmation
