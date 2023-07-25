import AdaptableCard from '@/components/shared/AdaptableCard'
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps, FieldInputProps } from 'formik'
import type { ComponentType } from 'react'
import type { InputProps } from '@/components/ui/Input'
import TimeInput from '@/components/ui/TimeInput'

type FormFieldsName = {
    name: string
    price: number
    duration: Date | null
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

const PriceInput = (props: InputProps) => {
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

const BasicInformationFields = (props: BasicInformationFields) => {
    const { touched, errors } = props

    return (
        <AdaptableCard className="mb-4">
            <FormItem
                label="Product Name"
                invalid={(errors.name && touched.name) as boolean}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Start Price"
                invalid={(errors.price && touched.price) as boolean}
                errorMessage={errors.price}
            >
                <Field name="price">
                    {({ field, form }: FieldProps) => {
                        return (
                            <NumericFormatInput
                                form={form}
                                field={field}
                                placeholder="Price"
                                customInput={
                                    PriceInput as ComponentType
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
            <FormItem
                label="Time"
                invalid={(errors.duration && touched.duration) as boolean}
                errorMessage={errors.duration}
            >
                <Field name="duration" placeholder="Time">
                    {({
                        field,
                        form,
                    }: FieldProps<FormFieldsName>) => (
                        <TimeInput
                            field={field}
                            form={form}
                            onChange={(time) => {
                                form.setFieldValue(
                                    field.name,
                                    time
                                )
                            }}
                        />
                    )}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
