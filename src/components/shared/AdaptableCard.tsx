import classNames from 'classnames'
import Card from '@/components/ui/Card'
import type { CardProps } from '@/components/ui/Card'

interface AdaptableCardProps extends CardProps {
    isLastChild?: boolean
}

const AdaptableCard = (props: AdaptableCardProps) => {
    const {
        className,
        children,
        bodyClass,
        ...rest
    } = props

    return (
        <Card
            className={classNames(
                className
            )}
            {...rest}
            bodyClass={classNames(
                bodyClass
            )}
        >
            {children}
        </Card>
    )
}

export default AdaptableCard
