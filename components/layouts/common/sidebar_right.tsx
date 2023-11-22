import { useEffect, useState } from 'react'
import _ from 'lodash'
import { appApi } from '@/api-client'
import { useAuth, useBookmarks } from '@/hooks'
import { useStore } from '@/store'
import { StarIcon } from '@heroicons/react/24/solid'
import useSWR from 'swr'
import Link from 'next/link'
import helo from '../../../public/vang-xoa-nen.png'

type Props = {}
export function SidebarRight({}: Props) {
  const { profile, logout, fistLoading } = useAuth()
  const { bookmarks, fistLoading: loadBookmarks } = useBookmarks()
  const {
    data: userFamous,
    error,
    mutate,
  } = useSWR<any>(`/users/famous`, {
    dedupingInterval: 5 * 60 * 1000,
    revalidateOnFocus: false,
  })
  const renderBookmark = () => {
    if (loadBookmarks) {
      return (
        <>
          <li className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
            <div className='animate-pulse bg-gray-300 w-full h-14 rounded-md' />
          </li>
          <li className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
            <div className='animate-pulse bg-gray-300 w-full h-14 rounded-md' />
          </li>
          <li className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
            <div className='animate-pulse bg-gray-300 w-full h-14 rounded-md' />
          </li>
        </>
      )
    }
    if (bookmarks?.length == 0) {
      return (
        <>
          <div className='text-center py-3 text-gray-600'>Không có gì!</div>
        </>
      )
    }
    return (
      <>
        {_.map(bookmarks, (item: any) => (
          <li
            key={item?.id}
            className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
            <Link href={item?.url_redirect}>
              <a>
                {item?.subject == 'COMMENT' ? (
                  <>
                    <span className='px-2 py-[1px] rounded-md mr-2 bg-blue-200 text-blue-600 text-xs'>
                      trả lời
                    </span>
                    <div className='cut-text'>{item?.content}</div>
                  </>
                ) : item?.subject == 'POST' ? (
                  <>
                    <span className='px-2 py-[1px] rounded-md mr-2 bg-yellow-200 text-yellow-600 text-xs'>
                      bài viết
                    </span>
                    <div className='cut-text'>{item?.content}</div>
                  </>
                ) : (
                  ''
                )}
              </a>
            </Link>
          </li>
        ))}
      </>
    )
  }

  const renderUsersFamous = () => {
    if (userFamous === undefined && error === undefined) {
      return (
        <>
          <li className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
            <div className='animate-pulse bg-gray-300 w-full h-14 rounded-md' />
          </li>
          <li className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
            <div className='animate-pulse bg-gray-300 w-full h-14 rounded-md' />
          </li>
          <li className='w-full py-2 px-1 border-b hover:bg-white text-sm hover:cursor-pointer'>
            <div className='animate-pulse bg-gray-300 w-full h-14 rounded-md' />
          </li>
        </>
      )
    }
    return _.map(userFamous, (item, index: any) => (
      <li
      key={item?.username}
      className='w-full py-2 px-1 border-b dark:border-gray-500 hover:bg-white dark:hover:bg-slate-800 text-sm hover:cursor-pointer'>
      <div className='flex items-center'>
        <div className='relative'>
          {item?.avatar ? (
            <img src={item?.avatar} className='w-8 h-8 rounded-full mr-3' />
          ) : (
            <div className='w-8 h-8 rounded-full mr-3 bg-yellow-600 text-white flex justify-center items-center'>
              {item?.name[0]}
            </div>
          )}
    {index === 0 && (  <img src="/vang-xoa-nen.png" alt="Star Icon" className="h-5 w-5 ml-1text-yellow-500 absolute -top-1 right-1"  /> )}
       {index === 1 && (  <img src="/bac-xoa-nen.png" alt="Star Icon" className="h-5 w-5 ml-1 text-yellow-500 absolute -top-1 right-1"  /> )}
       {index === 2 && (  <img src="/dong-xoa-nen.png" alt="Star Icon" className="h-5 w-5 ml-1 text-yellow-500 absolute -top-1 right-1"  /> )}
        </div>
        <div>
          <div className='flex items-center text-xs text-gray-500 dark:text-gray-100'>
            <span className='mr-1'>{index + 1}</span>
            <span className='mr-1'>·</span>
            <span>Nổi bật </span>
            {index === 0 && <StarIcon className='h-3 w-3 ml-1 text-yellow-500' />}
          </div>
          <Link href={`/nguoi-dung/${item?.username}`}>
            <a>
              <h3 className='font-semibold hover:underline'>{item?.name}</h3>
            </a>
          </Link>
          <div className='text-orange-600'>{item?.reputation} Điểm</div>
        </div>
      </div>
    </li>
    ))
  }
  return (
    <>
      <div className='w-full border rounded-lg bg-gray-50 dark:bg-slate-900 dark:border-gray-500 mb-5 overflow-hidden'>
        <div
          className='w-full border-b flex items-center px-3 pt-5 pb-1 dark:border-gray-500'
          style={{
            backgroundImage: 'url("/home-banner.png")',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
          <h2 className='text-lg font-semibold text-white'>
            Người dùng nổi bật
          </h2>
        </div>
        <div className='px-2'>
          <ul>{renderUsersFamous()}</ul>
        </div>
      </div>
      {profile?.name && (
        <div className='w-full border p-3 rounded-lg bg-gray-50 dark:bg-slate-900 dark:border-gray-500  '>
          <div className='w-full border-b pb-2 flex justify-start items-center dark:border-gray-500 '>
            <h2 className='text-lg font-semibold'>Bookmarks ({bookmarks?.length})</h2>
          </div>
          <ul className='w-full'>{renderBookmark()}</ul>
        </div>
      )}
    </>
  )
}
