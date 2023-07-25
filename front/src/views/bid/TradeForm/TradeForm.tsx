import Button from '@/components/ui/Button'
import { FormItem, FormContainer } from '@/components/ui/Form'
import { FormNumericInput } from '@/components/shared'
import { Field, Form, Formik, FieldProps } from 'formik'
import * as Yup from 'yup'

export type FormModel = {
    amount: number
}

export type FormBidHistoryModel = {
    productID: number | undefined
    userID: number | undefined
    bidPrice: number
}

export type TradeFormProps = {
    amount: number
    onBid: (
        values: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => void
}

const TradeForm = (props: TradeFormProps) => {
    const { onBid, amount } = props

    const validationSchema = Yup.object().shape({
        amount: Yup.number()
            .min(amount, `Min amount ${amount}`)
            .required('Please enter an amount'),
    })
    
    return (
        <div>
            <Formik
                initialValues={{
                    amount: amount
                }}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    onBid(values, setSubmitting)
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Bid Price"
                                invalid={errors.amount && touched.amount}
                                errorMessage={errors.amount}
                            >
                                <Field name="amount">
                                    {({ field, form }: FieldProps) => {
                                        return (
                                            <FormNumericInput
                                                thousandSeparator={true}
                                                form={form}
                                                field={field}
                                                placeholder="Bid Price"
                                                value={field.value}
                                                inputSuffix={
                                                    <span className="font-semibold">
                                                        USD
                                                    </span>
                                                }
                                                onValueChange={(e) => {
                                                    form.setFieldValue(
                                                        field.name,
                                                        e.floatValue
                                                    )
                                                }}
                                            />
                                        )
                                    }}
                                </Field>
                            </FormItem>
                            <Button
                                block
                                variant="solid"
                                loading={isSubmitting}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default TradeForm
