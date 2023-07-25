import { useEffect, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import { HiOutlineUpload, HiOutlineTrash } from 'react-icons/hi'
import {
    getProducts,
    setTableData,
    setSelectedProduct,
    togglePublishConfirmation,
    toggleDeleteConfirmation,
    useAppDispatch,
    useAppSelector,
} from '../store'
import ProductPublishConfirmation from './ProductPublishConfirmation'
import ProductDeleteConfirmation from './ProductDeleteConfirmation'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'

type Product = {
    productID: number
    name: string
    duration: number
    price: number
    publish: number
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
        label: 'Draft',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    2: {
        label: 'Publish',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
}

const ActionColumn = ({ row }: { row: Product }) => {
    const dispatch = useAppDispatch()

    const onPublish = () => {
        dispatch(togglePublishConfirmation(true))
        dispatch(setSelectedProduct(row.productID))
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.productID))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:text-sky-600`}
                onClick={onPublish}
            >
                <HiOutlineUpload />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const ProductColumn = ({ row }: { row: Product }) => {
    return (
        <div className="flex items-center">
            <span className={`ml-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const ProductTable = () => {
    dayjs.extend(relativeTime)
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.bidProductList.data.tableData
    )

    const filterData = useAppSelector(
        (state) => state.bidProductList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.bidProductList.data.loading
    )

    const data = useAppSelector(
        (state) => state.bidProductList.data.productList
    )
    
    const { userID } = useAppSelector(
        (state) => state.auth.user
    )
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getProducts({ pageIndex, pageSize, sort, query, filterData, userID: userID }))
    }

    const columns: ColumnDef<Product>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            {
                header: 'Current Price',
                accessorKey: 'price',
                cell: (props) => {
                    const { price } = props.row.original
                    return <span>${price}</span>
                },
            },
            {
                header: 'Status',
                accessorKey: 'publish',
                cell: (props) => {
                    const { publish } = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <span
                                className={`capitalize font-semibold ${statusColor[publish].textClass}`}
                            >
                                {statusColor[publish].label}
                            </span>
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
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
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <ProductPublishConfirmation />
            <ProductDeleteConfirmation />
        </>
    )
}

export default ProductTable
