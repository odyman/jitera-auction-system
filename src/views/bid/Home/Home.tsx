import { useEffect, useRef } from 'react'
import Tabs from '@/components/ui/Tabs'
import AdaptableCard from '@/components/shared/AdaptableCard'
import reducer, {
    getBidData,
    setSelectedTab,
    setTableData,
    setBidData,
    initialTableData,
    useAppDispatch,
    useAppSelector,
    Ongoing,
    Completed,
} from './store'
import { injectReducer } from '@/store'
import cloneDeep from 'lodash/cloneDeep'
import OngoingTable from './components/OngoingTable'
import CompletedTable from './components/CompletedTable'
import TradeDialog from './components/TradeDialog'
import QueryInput from './components/QueryInput'

injectReducer('ongoingBid', reducer)

const { TabNav, TabList, TabContent } = Tabs

const Home = () => {
    const dispatch = useAppDispatch()

    const inputRef = useRef(null)

    const data = useAppSelector((state) => state.ongoingBid.data.bidData)

    const loading = useAppSelector((state) => state.ongoingBid.data.loading)

    const selectedTab = useAppSelector(
        (state) => state.ongoingBid.data.selectedTab
    )

    const tableData = useAppSelector(
        (state) => state.ongoingBid.data.tableData
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, selectedTab, tableData])

    const fetchData = () => {
        dispatch(getBidData({ tab: selectedTab, ...tableData }))
    }

    const handleTabChange = (val: string) => {
        dispatch(setBidData([]))
        dispatch(setSelectedTab(val))
        dispatch(setTableData(initialTableData))
    }

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            dispatch(setTableData(newTableData))
        }

        if (typeof val === 'string' && val.length === 0) {
            dispatch(setTableData(newTableData))
        }
    }

    return (
        <>
            <AdaptableCard>
                <Tabs
                    value={selectedTab}
                    variant="pill"
                    onChange={handleTabChange}
                >
                    <div className="flex lg:items-center justify-between flex-col lg:flex-row gap-4">
                        <TabList>
                            <TabNav value="ongoing">Ongoing</TabNav>
                            <TabNav value="completed">Completed</TabNav>
                        </TabList>
                        <QueryInput
                            ref={inputRef}
                            onInputChange={handleInputChange}
                        />
                    </div>
                    <div className="mt-4">
                        <TabContent value="ongoing">
                            <OngoingTable
                                {...{
                                    data: data as Ongoing[],
                                    loading,
                                    tableData,
                                }}
                            />
                        </TabContent>
                        <TabContent value="completed">
                            <CompletedTable
                                {...{
                                    data: data as Completed[],
                                    loading,
                                    tableData,
                                }}
                            />
                        </TabContent>
                    </div>
                </Tabs>
            </AdaptableCard>
            <TradeDialog />
        </>
    )
}

export default Home
