import { MainLayout } from '@/components/layouts'
import React from 'react'
import { NextPageWithLayout } from '@/models'

type Props = {}

const About: NextPageWithLayout = (props: Props) => {
  return (
    <div className='w-full min-h-screen bg-white border border-gray-200 rounded-lg'></div>
  )
}

About.Layout = MainLayout
About.sidebarRight = true
About.SidebarLeft = true
About.requestAuth = false
export default About
