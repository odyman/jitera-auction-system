import { useMemo } from 'react'
import DataTable from '@/components/shared/DataTable'
import { setTableData, useAppDispatch, Ongoing } from '../store'
import ActionColumn from './ActionColumn'
import cloneDeep from 'lodash/cloneDeep'
import { NumericFormat } from 'react-number-format'
import type { TableQueries } from '@/@types/common'
import type { ColumnDef, OnSortParam } from '@/components/shared'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

type OngoingTableProps = {
    data?: Ongoing[]
    loading: boolean
    tableData: TableQueries
}

const statusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    1: {
        label: 'Ongoing',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    2: {
        label: 'Completed',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
}

const OngoingTable = ({ data, loading, tableData }: OngoingTableProps) => {
    dayjs.extend(relativeTime)
    const dispatch = useAppDispatch()

    const columns: ColumnDef<Ongoing>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const { name } = props.row.original
                    return (
                        <div className="flex items-center gap-3">
                            <span>{name}</span>
                        </div>
                    )
                },
            },
            {
                header: 'Current Price',
                accessorKey: 'price',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <NumericFormat
                            displayType="text"
                            value={row.price}
                            prefix={'$'}
                            thousandSeparator={true}
                        />
                    )
                },
            },
            {
                header: 'Duration',
                accessorKey: 'duration',
                cell: (props) => {
                    const { duration } = props.row.original
                    return (
                        <div className="flex items-center">
                            {dayjs.unix(duration).toNow(true)}
                        </div>
                    )
                },
            },
            {
                header: 'Status',
                accessorKey: 'completed',
                cell: (props) => {
                    const { completed } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <span
                                className={`capitalize font-semibold ${statusColor[completed].textClass}`}
                            >
                                {statusColor[completed].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => {
                    const row = props.row.original
                    return <ActionColumn row={row} />
                },
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <DataTable
            columns={columns}
            data={data}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{
                width: 28,
                height: 28,
                className: 'rounded-md',
            }}
            loading={loading}
            pagingData={{
                total: tableData?.total as number,
                pageIndex: tableData?.pageIndex as number,
                pageSize: tableData?.pageSize as number,
            }}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
        />
    )
}

export default OngoingTable
