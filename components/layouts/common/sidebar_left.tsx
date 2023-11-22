import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { TagModel } from '@/models'
import _ from 'lodash'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
import {
  HomeIcon,
  FireIcon,
  TagIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  ChartPieIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/hooks'
import { useTagsFollow } from '@/hooks/use-tag'
import { TagForSidebar } from '@/components/tags_for_sidebar'

type Props = {}
export function SidebarLeft({}: Props) {
  const { asPath } = useRouter()
  const { profile } = useAuth()
  const menu = [
    {
      title: 'Trang Chủ',
      href: '/',
      icon: HomeIcon,
      display: true,
    },
    // {
    //   title: 'Hỏi đáp',
    //   href: '/tag/hoi-dap',
    //   icon: QuestionMarkCircleIcon,
    //   display: true,
    // },
    // {
    //   title: 'Thảo luận',
    //   href: '/tag/thao-luan',
    //   icon: ChatBubbleLeftRightIcon,
    //   display: true,
    // },
    {
      title: 'Community',
      href: '/tags',
      icon: TagIcon,
      display: true,
    },
    // {
    //   title: 'Giới thiệu',
    //   href: '/gioi-thieu',
    //   icon: FireIcon,
    //   display: true,
    // },
  ]
  return (
    <aside className='w-full sticky top-[85px] z-10 mt-5 mb-5 bg-white dark:bg-slate-900 border rounded-lg dark:border-gray-500'>
      <div className='px-3 py-4 overflow-y-auto relative '>
        <ul className='space-y-2'>
          {menu.map(
            (item) =>
              item?.display && (
                <li key={item.href}>
                  <Link href={item.href}>
                    <a
                      className={classNames(
                        'flex items-center p-2 text-sm font-normal text-gray-900 hover:border-l-4 hover:border-indigo-600 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700',
                        asPath == item.href &&
                          'border-l-4 border-indigo-600 font-bold text-black'
                      )}>
                      <item.icon
                        className={classNames(
                          'w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-50 group-hover:text-gray-900 dark:group-hover:text-white',
                          asPath == item.href && 'font-bold text-black'
                        )}
                      />
                      <span className='ml-3'>{item.title}</span>
                    </a>
                  </Link>
                </li>
              )
          )}
        </ul>
        <div>
          <div className='pt-4 mt-4 space-y-2   border-t border-gray-200 dark:border-gray-700'>
            <TagForSidebar />
          </div>
        </div>
      </div>
    </aside>
  )
}
