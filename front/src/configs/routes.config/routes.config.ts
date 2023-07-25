import { lazy } from 'react'
import authRoute from './authRoute'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: `${APP_PREFIX_PATH}/bid/home`,
        component: lazy(() => import('@/views/bid/Home')),
        authority: [ADMIN, USER],
        meta: {
            header: '',
        },
    },
    {
        key: 'products',
        path: `${APP_PREFIX_PATH}/bid/product-list`,
        component: lazy(() => import('@/views/bid/ProductList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'product-new',
        path: `${APP_PREFIX_PATH}/bid/product-new`,
        component: lazy(() => import('@/views/bid/ProductNew')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Add New Product',
        },
    },
    {
        key: 'deposit',
        path: `${APP_PREFIX_PATH}/bid/deposit`,
        component: lazy(() => import('@/views/bid/Deposit')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Deposit',
        },
    },
]