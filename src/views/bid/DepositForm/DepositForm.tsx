import { forwardRef, ComponentType } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormContainer, FormItem } from '@/components/ui/Form'
import { Form, Formik, FormikProps, Field, FieldProps, FieldInputProps } from 'formik'
import Button from '@/components/ui/Button'
import StickyFooter from '@/components/shared/StickyFooter'
import cloneDeep from 'lodash/cloneDeep'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import Input from '@/components/ui/Input'
import { useAppSelector } from '@/store'
import type { InputProps } from '@/components/ui/Input'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    id?: string
    amount?: number
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type DepositForm = {
    initialData?: InitialData
    onDiscard?: () => void
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
    amount: Yup.number().required('Amount Required')
})

const AmountInput = (props: InputProps) => {
    return <Input {...props} value={props.field.value} prefix="$" />
}

const NumericFormatInput = ({
    onValueChange,
    ...rest
}: Omit<NumericFormatProps, 'form'> & {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    form: any
    field: FieldInputProps<unknown>
}) => {
    return (
        <NumericFormat
            customInput={Input as ComponentType}
            type="text"
            autoComplete="off"
            onValueChange={onValueChange}
            {...rest}
        />
    )
}

const DepositForm = forwardRef<FormikRef, DepositForm>((props, ref) => {
    const { balance } = useAppSelector(
        (state) => state.auth.user
    )
    const {
        initialData = {
            id: '',
            amount: balance,
        },
        onFormSubmit,
        onDiscard,
    } = props
    
    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData
                }}
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                                <div className="lg:col-span-2">
                                <AdaptableCard className="mb-4">
                                    <FormItem
                                        label="Amount"
                                        invalid={(errors.amount && touched.amount) as boolean}
                                        errorMessage={errors.amount as string}
                                    >
                                        <Field name="amount">
                                            {({ field, form }: FieldProps) => {
                                                return (
                                                    <NumericFormatInput
                                                        form={form}
                                                        field={field}
                                                        placeholder="Amount"
                                                        customInput={
                                                            AmountInput as ComponentType
                                                        }
                                                        onValueChange={(e) => {
                                                            form.setFieldValue(
                                                                field.name,
                                                                e.value
                                                            )
                                                        }}
                                                    />
                                                )
                                            }}
                                        </Field>
                                    </FormItem>
                                </AdaptableCard>
                                </div>
                            </div>                                        
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white border-gray-200"
                            >
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="mr-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

DepositForm.displayName = 'DepositForm'

export default DepositForm
