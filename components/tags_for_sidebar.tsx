import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import Link from 'next/link'
import { useAuth } from '@/hooks'
import useSWR from 'swr'
import { useTagsFollow } from '@/hooks/use-tag'
import _ from 'lodash'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function TagForSidebar() {
  const { profile } = useAuth()
  const { tagsFollowing, mutate, error, fistLoading } = useTagsFollow()
  const { data: tags, error: tagsError }: any = useSWR(`/tags`, {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })
  useEffect(() => {
    if (!profile?.name) {
      mutate([], false)
    } else {
      mutate()
    }
  }, [profile?.name])
  const renderTags = (load: boolean, tags: any[]) => {
    if (load) {
      return (
        <>
          <li className='mb-2'>
            <div className='animate-pulse bg-gray-300 w-full h-7 mr-2 rounded-full' />
          </li>
          <li>
            <div className='animate-pulse bg-gray-300 w-full h-7 mr-2 rounded-full' />
          </li>
        </>
      )
    }
    return _.map(tags, (item) => (
      <li key={item?.slug}>
        <Link href={`/tag/${item?.slug}`}>
          <a className='flex items-center p-2 text-sm font-normal text-gray-900 transition duration-75 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white group '>
            <span
              className={`text-${
                item?.color_bg ? item?.color_bg : 'gray'
              }-800 dark:text-gray-100`}>
              #
            </span>
            {item?.name}
          </a>
        </Link>
      </li>
    ))
  }
  return (
    <div className='w-full max-w-md px-2 sm:px-0'>
      <h2 className='text-lg font-bold text-gray-900 dark:text-gray-50'>
        Danh sách Community
      </h2>
      {profile?.name ? (
        <Tab.Group>
          <Tab.List className='flex space-x-1 rounded-xl  p-1'>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full text-sm  hover:bg-gray-200 py-1 rounded-md font-medium hover:text-black  border-none shadow-none outline-none',
                  selected
                    ? ' underline bg-gray-200 text-black'
                    : 'hover:underline dark:text-gray-400'
                )
              }>
              Theo dõi
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full text-sm  hover:bg-gray-200 py-1 rounded-md font-medium hover:text-black  border-none shadow-none outline-none',
                  selected
                    ? ' underline bg-gray-200 text-black'
                    : 'hover:underline dark:text-gray-400'
                )
              }>
              Tất cả
            </Tab>
          </Tab.List>
          <Tab.Panels className='mt-2'>
            <Tab.Panel>
              <ul className='max-h-72 overflow-y-auto'>
                {renderTags(fistLoading, tagsFollowing)}
              </ul>
            </Tab.Panel>
            <Tab.Panel>
              <ul className='max-h-72 overflow-y-auto'>
                {renderTags(
                  tags === undefined && tagsError === undefined,
                  tags
                )}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <div>
          {' '}
          <ul className='max-h-72 overflow-y-auto'>
            {renderTags(tags === undefined && tagsError === undefined, tags)}
          </ul>
        </div>
      )}
    </div>
  )
}
