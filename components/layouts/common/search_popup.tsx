import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'
import { Transition, Dialog, Tab } from '@headlessui/react'
import { appApi } from '@/api-client'
import format_date from '@/utils/format_date'

import _ from 'lodash'
import Link from 'next/link'
import {
  POST_SEARCH_SORT,
  TAG_SEARCH_SORT,
  USER_SEARCH_SORT,
} from '@/constants'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function SearchPopup(props: any) {
  const [keyword, setKeyword] = useState('')
  const [result, setResult] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState(POST_SEARCH_SORT)
  useEffect(() => {
    setLoading(true)
    const delayDebounceFn = setTimeout(() => {
      setLoading(true)
      if (keyword.length > 0) {
        fetchData()
      }
      setResult([])
      setLoading(false)
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [keyword, sort])
  const fetchData = async () => {
    setLoading(true)
    await appApi.search(keyword, sort, 5).then((res: any) => {
      setLoading(false)
      setResult(res)
    })
  }
  const renderData = () => {
    if (loading) {
      return (
        <>
          <li className='mb-2'>
            <div className='animate-pulse bg-gray-300 w-full h-14 mr-2 rounded-md' />
          </li>
          <li className='mb-2'>
            <div className='animate-pulse bg-gray-300 w-full h-14 mr-2 rounded-md' />
          </li>
          <li className='mb-2'>
            <div className='animate-pulse bg-gray-300 w-full h-14 mr-2 rounded-md' />
          </li>
        </>
      )
    }
    if (result.length == 0 || keyword.length == 0) {
      return <li className='text-center py-5'>Không có kết quả</li>
    }
    switch (sort) {
      case POST_SEARCH_SORT:
        return _.map(result, (item: any) => (
          <li
            onClick={() => props.getChangerPopupSearch(false)}
            key={item?.slug}
            className='relative p-3 rounded-md hover:bg-coolGray-100 hover:bg-gray-100'>
            <h3 className='text-sm font-medium leading-5'>{item.title}</h3>
            <ul className='flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500'>
              <li>{format_date.formatDate(item?.createdAt)}</li>
              <li>&middot;</li>
              <li>{item?.commentCount} Bình luận</li>
              <li>&middot;</li>
              <li>{item?.voteCount} Đánh giá</li>
              <li>&middot;</li>
              <li>{item?.bookmarkCount} Bookmark</li>
            </ul>
            <Link href={`/bai-dang/${item?.slug}`}>
              <a
                className={classNames(
                  'absolute inset-0 rounded-md',
                  'focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'
                )}
              />
            </Link>
          </li>
        ))
      case USER_SEARCH_SORT:
        return _.map(result, (item: any) => (
          <li
            onClick={() => props.getChangerPopupSearch(false)}
            key={item?.username}
            className='relative p-3 rounded-md hover:bg-coolGray-100 hover:bg-gray-100'>
            <div className='flex'>
              <div className='mr-2'>
                <img
                  src={item?.avatar}
                  alt={item?.name}
                  className=' w-10 h-10 rounded-full object-cover'
                />
              </div>
              <div>
                <h3 className='text-sm font-medium leading-5'>{item.name}</h3>
                <ul className='flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500'>
                  <li>Reputation: {item?.reputation}</li>
                  <li>&middot;</li>
                  <li>Bài đăng: {item?.post_count}</li>
                  <li>&middot;</li>
                  <li>Ý kiến đóng góp: {item?.comment_count}</li>
                </ul>
              </div>
            </div>

            <Link href={`/nguoi-dung/${item?.username}`}>
              <a
                className={classNames(
                  'absolute inset-0 rounded-md',
                  'focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'
                )}
              />
            </Link>
          </li>
        ))
      case TAG_SEARCH_SORT:
        return _.map(result, (item: any) => (
          <li
            onClick={() => props.getChangerPopupSearch(false)}
            key={item?.slug}
            className='relative p-3 rounded-md hover:bg-coolGray-100 hover:bg-gray-100'>
            <h3 className='text-sm font-medium leading-5'>#{item.name}</h3>
            <ul className='flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500'>
              <li>Lượt theo dõi: {item?.tag_follow_count}</li>
              <li>&middot;</li>
              <li>Số lượng bài đăng: {item?.posts_use}</li>
            </ul>
            <Link href={`/tag/${item?.slug}`}>
              <a
                className={classNames(
                  'absolute inset-0 rounded-md',
                  'focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'
                )}
              />
            </Link>
          </li>
        ))
    }
  }
  return (
    <>
      <Transition appear show={props.searchIsOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-50 bg-blend-hue overflow-y-auto'
          onClose={() => props.getChangerPopupSearch(false)}>
          <div className='min-h-screen px-1 lg:px-4 text-center bg-black bg-opacity-40 '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed' />
            </Transition.Child>
            <span className='inline-block  h-screen align-top'>&#8203;</span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <div className='inline-block w-full lg:max-w-3xl p-6 my-28 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-900 shadow-xl rounded-2xl'>
                <div className='flex justify-between items-start rounded-t '>
                  <button
                    onClick={() => {
                      props.getChangerPopupSearch(false)
                    }}
                    type='button'
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                    data-modal-toggle='defaultModal'>
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'></path>
                    </svg>
                  </button>
                </div>
                <input
                  value={keyword}
                  onChange={(value) => setKeyword(value.target.value)}
                  autoFocus={true}
                  placeholder='Search...'
                  className='w-full outline-none bg-transparent border-l-2 border-l-indigo-200 focus:border-l-indigo-600 text-3xl mt-3 h-16 px-4 py-2 dark:hover:text-gray-700'
                />
                <div className='border-b-2 mt-2' />
                <div className='w-full mt-4 sm:px-0 '>
                  <div className='flex space-x-1 rounded-xl bg-gray-400/20 p-1 mb-3'>
                    <button
                      onClick={() => {
                        setLoading(true)
                        setResult([])
                        setSort(POST_SEARCH_SORT)
                      }}
                      className={classNames(
                        'ring-white  w-full rounded-lg py-2.5 dark:text-gray-100 text-sm leading-5 text-gray-700 hover:bg-gray-100 dark:hover:text-gray-700',
                        sort == POST_SEARCH_SORT &&
                          'bg-white dark:bg-gray-200 hover:bg-white border font-medium dark:text-black'
                      )}>
                      Bài đăng
                    </button>
                    <button
                      onClick={() => {
                        setLoading(true)
                        setResult([])
                        setSort(USER_SEARCH_SORT)
                      }}
                      className={classNames(
                        'ring-white  w-full rounded-lg py-2.5 text-sm dark:text-gray-100 leading-5 text-gray-700 hover:bg-gray-100 dark:hover:text-gray-700',
                        sort == USER_SEARCH_SORT &&
                          'bg-white dark:bg-gray-200 hover:bg-white border font-medium dark:text-black'
                      )}>
                      Người dùng
                    </button>
                    <button
                      onClick={() => {
                        setLoading(true)
                        setResult([])
                        setSort(TAG_SEARCH_SORT)
                      }}
                      className={classNames(
                        'ring-white  w-full rounded-lg py-2.5 dark:text-gray-100 text-sm leading-5 text-gray-700 hover:bg-gray-100',
                        sort == TAG_SEARCH_SORT &&
                          'bg-white dark:bg-gray-200 hover:bg-white border font-medium dark:text-black'
                      )}>
                      Cộng đồng
                    </button>
                  </div>
                  <div className='mb-3 flex justify-between'>
                    <div>Kết quả tìm kiếm:</div>
                    <div>
                      <Link
                        href={`/tim-kiem?q=${keyword}&type=${sort}&limit=${10}`}>
                        <a
                          onClick={() => props.getChangerPopupSearch(false)}
                          className=' text-indigo-600 hover:underline'>
                          Xem thêm kết quả
                        </a>
                      </Link>
                    </div>
                  </div>

                  <ul>{renderData()}</ul>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
