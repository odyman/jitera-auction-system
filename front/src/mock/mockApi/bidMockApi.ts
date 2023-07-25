import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs'

export default function bidMockApi(server: Server, apiPrefix: string) {
    server.post(`${apiPrefix}/bid/ongoing`, (schema, { requestBody }) => {
        const { tab, pageIndex, pageSize, sort, query } = JSON.parse(requestBody)

        const { order, key } = sort
        const products = schema.db.productsData
        const sanitizeProducts = products.filter(
            (elm) => typeof elm !== 'function'
        )
        // filter by status: 0 = ongoing, 1 = completed 
        const ongoingProducts = sanitizeProducts.filter(
            (product) => tab ==='ongoing'? product.status === 0 : product.status === 1
        )
        let data = ongoingProducts
        let total = ongoingProducts.length

        if (key && order) {
            if (key === 'duration') {
                data.sort(sortBy(key, order === 'desc', parseInt as Primer))
            } else {
                data.sort(
                    sortBy(key, order === 'desc', (a) =>
                        (a as string).toUpperCase()
                    )
                )
            }
        }

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, pageSize, pageIndex)

        return {
            data,
            total,
        }
    })

    server.post(`${apiPrefix}/bid/products`, (schema, { requestBody }) => {
        const body = JSON.parse(requestBody)
        const { pageIndex, pageSize, sort, query } = body
        const { order, key } = sort
        const products = schema.db.productsData
        const sanitizeProducts = products.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeProducts
        let total = products.length

        if ((key !== 'name') && order) {
            data.sort(
                sortBy(key, order === 'desc', (a) =>
                    (a as string).toUpperCase()
                )
            )
        } else {
            data.sort(sortBy(key, order === 'desc', parseInt as Primer))
        }

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, pageSize, pageIndex)

        const responseData = {
            data: data,
            total: total,
        }
        return responseData
    })

    server.del(
        `${apiPrefix}/bid/products/delete`,
        (schema, { requestBody }) => {
            const { id } = JSON.parse(requestBody)
            schema.db.productsData.remove({ id })
            return true
        }
    )

    server.get(`${apiPrefix}/bid/product`, (schema, { queryParams }) => {
        const id = queryParams.id
        const product = schema.db.productsData.find(id)
        return product
    })

    server.put(
        `${apiPrefix}/bid/products/update`,
        (schema, { requestBody }) => {
            const data = JSON.parse(requestBody)
            const { id } = data
            schema.db.productsData.update({ id }, data)
            return true
        }
    )

    server.post(
        `${apiPrefix}/bid/products/create`,
        (schema, { requestBody }) => {
            const data = JSON.parse(requestBody)
            schema.db.productsData.insert(data)
            return true
        }
    )

}
