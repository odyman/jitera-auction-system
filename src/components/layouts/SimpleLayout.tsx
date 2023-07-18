import Header from '@/components/template/Header'
import UserDropdown from '@/components/template/UserDropdown'
import HeaderLogo from '@/components/template/HeaderLogo'
import MenuItem from '@/components/ui/MenuItem'
import View from '@/views'
import { useAppSelector } from '@/store'
import { NumericFormat } from 'react-number-format'
import { Link } from 'react-router-dom'

const HeaderActionsStart = () => {
    return (
        <>
            <Link 
                className="flex h-full w-full px-2" 
                to='/app/bid/home'
            >
                <HeaderLogo />
            </Link>
            <Link 
                className="flex h-full w-full px-2" 
                to='/app/bid/home'
            >
               <MenuItem>
                    <span className="flex items-center gap-2">
                        Home
                    </span>
                </MenuItem>
            </Link>
            
        </>
    )
}

const HeaderActionsEnd = () => {
    const { balance } = useAppSelector(
        (state) => state.auth.user
    )
    return (
        <>  
            <Link to='/app/bid/deposit'>
                <div className="font-bold text-gray-900">
                    <span>Balance: </span>
                    <NumericFormat
                        displayType="text"
                        value={balance}
                        suffix=" USD"
                        thousandSeparator={true}
                    />
                </div>
            </Link>
            <UserDropdown hoverable={false} />
        </>
    )
}

const SimpleLayout = () => {
    return (
        <div className="app-layout-simple flex flex-auto flex-col min-h-screen">
            <div className="flex flex-auto min-w-0">
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        container
                        className="shadow"
                        headerStart={<HeaderActionsStart />}
                        headerEnd={<HeaderActionsEnd />}
                    />
                    <View pageContainerType="contained" />
                </div>
            </div>
        </div>
    )
}

export default SimpleLayout
