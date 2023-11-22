import React from 'react'
import { UserIcon, CogIcon } from '@heroicons/react/24/outline'
import { Tab } from '@headlessui/react'
import { MainLayout } from '@/components/layouts'
import SEO from '@bradgarropy/next-seo'
import { NextPageWithLayout } from '@/models'
import { ChangeAdvancedInfo, ChangeBaseInfo } from '@/components/account'
type Props = {}
function classNames(...classNamees: any) {
  return classNamees.filter(Boolean).join(' ')
}
const Settings: NextPageWithLayout = (props: Props) => {
  return (
    <>
      <SEO title='Cài đặt tài khoản' />
      <div className=' max-w-4xl mx-auto py-5  md:w-5/6 w-11/12 '>
        <ChangeBaseInfo />
      </div>
    </>
  )
}

Settings.Layout = MainLayout
Settings.sidebarRight = false
Settings.SidebarLeft = false
Settings.requestAuth = true

export default Settings
