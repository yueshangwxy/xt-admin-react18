import { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'

const UserList = lazy(() => import('@/views/list/user'))
const UserDetail = lazy(() => import('@/views/list/user/detail'))

export default {
  meta: {
    title: 'route.list.root',
  },
  children: [
    {
      path: '/list/user',
      element: <Suspense><UserList /></Suspense>,
      meta: {
        title: 'route.list.page1',
        auth: 'user.read1',
      },
    },
    {
      path: '/list/user/detail',
      element: <Suspense><UserDetail /></Suspense>,
      meta: {
        title: 'route.list.detail1',
        hideInMenu: true,
        hideInSearch: true,
        activeMenu: '/list/user',
        mergeTabbarPath: '/list/user',
        auth: 'user.detail',
      },
    },
  ],

} as RouteObject
