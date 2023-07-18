import ApiService from './ApiService'

export async function apiGetProducts<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/bid/products',
        method: 'post',
        data,
    })
}

export async function apiDeleteProducts<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/bid/products/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetProduct<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/bid/product',
        method: 'get',
        params,
    })
}

export async function apiUpdateProduct<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/bid/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateProduct<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/bid/products/create',
        method: 'post',
        data,
    })
}

export async function apiGetBidData<T, U extends Record<string, unknown>>(
  data: U
) {
  return ApiService.fetchData<T>({
      url: '/bid/ongoing',
      method: 'post',
      data,
  })
}

