import React, { Fragment, useEffect, useState } from 'react'
import SEO from '@bradgarropy/next-seo'
import { NextPageWithLayout } from '@/models'
import { MainLayout } from '@/components/layouts'
import { useAuth } from '@/hooks'
import { appApi } from '@/api-client'
import _ from 'lodash'
import Link from 'next/link'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
type Props = {}

const Notifications: NextPageWithLayout = (props: Props) => {
  const { login } = useAuth()
  const [notifications, setNotification] = useState([])
  const [notificationFilter, setNotificationFilter] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    await appApi.getNotify().then((res: any) => {
      setNotification(res)
      setNotificationFilter(res)
      setLoading(false)
    })
  }
  const sendNotification = async (id: number) => {
    await appApi.sendNotify(id)
  }
  let filtered_array: any = _.filter(notifications, { status: 'NOT_SEEN' })
  const renderNotification = () => {
    if (loading) {
      return (
        <>
          <div className='animate-pulse bg-gray-300 w-full h-20 mr-2 mb-2 rounded-md' />
          <div className='animate-pulse bg-gray-300 w-full h-20 mr-2 mb-2 rounded-md' />
          <div className='animate-pulse bg-gray-300 w-full h-20 mr-2 mb-2 rounded-md' />
          <div className='animate-pulse bg-gray-300 w-full h-20 mr-2 mb-2 rounded-md' />
        </>
      )
    }
    if (notifications.length == 0) {
      return <div className='text-center mt-5'>Bạn chưa có thông báo nào.</div>
    }
    return _.map(notificationFilter, (item: any) => (
  
      <Link key={item?.id} href={`${item?.redirect_url}`}>
  <a
    onClick={() => {
      if (item?.status === 'NOT_SEEN') {
        sendNotification(item?.id);
      }
    }}
    className='p-6 bg-white flex  items-center justify-between w-full rounded-lg mb-1 border border-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:border-gray-700'>
    <div className='flex items-center'>
      {item?.interactive_user?.imageUrl ? (
        <img
          src={item?.interactive_user?.imageUrl}
          alt={item?.interactive_user?.name}
          className='h-7 w-7 rounded-full mr-2'
        />
      ) : (
        <div className='h-7 w-7 rounded-full mr-2 flex justify-center items-center bg-yellow-600 text-white'>
          {item?.interactive_user?.name[0]}
        </div>
      )}
      <div>
        <span className=' font-medium mr-2'>
          {item?.interactive_user?.name}
        </span>{' '}
        {item.content}
      </div>
    </div>
    {item?.status == 'NOT_SEEN' && (
      <div className='h-3 w-3 bg-blue-500 rounded-full' />
    )}
  </a>
</Link>
    ))
  }
  return (
    <>
      <SEO title='Danh sách thông báo' description='Danh sách thông báo' />
      <div className=' min-h-screen md:min-h-[80vh] max-w-xl md:mt-5 m-auto border bg-gray-50 dark:border-gray-500 dark:bg-slate-900 md:mb-3 p-3 rounded-md'>
        <h2 className='text-2xl font-bold mb-3'>Thông báo</h2>
        <div className='flex mb-3'>
          <button
            onClick={() => {
              setNotificationFilter(notifications)
              setFilter('ALL')
            }}
            className={classNames(
              ' px-3 py-1 mr-2  rounded-md text-sm',
              filter === 'ALL' && 'bg-gray-200 font-semibold text-black'
            )}>
            Tất cả
          </button>
          <button
            onClick={() => {
              setNotificationFilter(filtered_array)
              setFilter('NOT_SENT')
            }}
            className={classNames(
              ' px-3 py-1 mr-2  rounded-md text-sm',
              filter === 'NOT_SENT' && 'bg-gray-200 font-semibold text-black'
            )}>
            Chưa đọc
          </button>
        </div>
        {renderNotification()}
      </div>
    </>
  )
}
Notifications.Layout = MainLayout
Notifications.sidebarRight = false
Notifications.SidebarLeft = false
Notifications.requestAuth = true
export default Notifications
