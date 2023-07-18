import View from '@/views'
import { useAppSelector } from '@/store'
import { HiOutlineCog } from 'react-icons/hi'
import classNames from 'classnames'

const ConfiguratorToggle = () => {
    const themeColor = useAppSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useAppSelector(
        (state) => state.theme.primaryColorLevel
    )

    return (
        <div
            className={classNames(
                'fixed right-0 top-96 p-3 rounded-tl-md rounded-bl-md text-white text-xl cursor-pointer select-none',
                `bg-${themeColor}-${primaryColorLevel}`
            )}
        >
            <HiOutlineCog />
        </div>
    )
}

const BlankLayout = () => {
    return (
        <div className="app-layout-blank flex flex-auto flex-col h-[100vh]">
            <View />
            <ConfiguratorToggle />
        </div>
    )
}

export default BlankLayout
