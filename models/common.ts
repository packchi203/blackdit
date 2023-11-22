import { SidebarLeft } from '@/components/layouts/common'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export interface LayoutProps {
  children: ReactNode
  sidebarRight: boolean
  sidebarLeft: boolean
  requestAuth: boolean
}

export type NextPageWithLayout = NextPage & {
  Layout?: (page: LayoutProps) => ReactElement
  sidebarRight?: boolean
  SidebarLeft?: boolean
  requestAuth?: boolean
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
