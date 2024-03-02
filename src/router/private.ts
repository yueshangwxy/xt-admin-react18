import type { IPrivateRoutes } from 'types/router'
import type { RouteObject } from 'react-router-dom'
import listRoutes from './modules/list'
import componentRoutes from './modules/component'
import layoutTwoRoutes from './modules/LayoutTwo'

export const privateRoutes: IPrivateRoutes[] = [
  {
    title: '演示',
    icon: 'ep:apple',
    children: [listRoutes, componentRoutes],
  },
  {
    title: '系统设置',
    icon: 'ep:setting',
    children: [layoutTwoRoutes],
  },
]

function addPrivateChildrenIndex(privateChildrenRoutes: RouteObject[], parentIndex: number) {
  privateChildrenRoutes.forEach((item) => {
    item.parentIndex = parentIndex
    if (item.children?.length)
      addPrivateChildrenIndex(item.children, item.parentIndex)
  })
}

function allPrivateChildrenRoutes() {
  privateRoutes.forEach((item, i) => {
    item.parentIndex = i
    if (item.children?.length)
      addPrivateChildrenIndex(item.children, item.parentIndex)
  })

  return privateRoutes.map(item => item.children).flat()
}

export default allPrivateChildrenRoutes()
