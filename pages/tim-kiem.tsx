import { MainLayout } from '@/components/layouts'
import React, { Fragment, useEffect, useState } from 'react'
import SEO from '@bradgarropy/next-seo'
import { NextPageWithLayout } from '@/models'
import { appApi } from '@/api-client'
import {
  POST_SEARCH_SORT,
  TAG_SEARCH_SORT,
  USER_SEARCH_SORT,
} from '@/constants'
import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Posts } from '@/components'
import TagItemSearch from '@/components/tag_item_search'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
type Props = {}

const Search: NextPageWithLayout = (props: Props) => {
  const router = useRouter()
  const query = router?.query
  const [keyword, setKeyword] = useState<any>(query.q)
  const [result, setResult] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState<any>(query.type ? query?.type : POST_SEARCH_SORT)
  useEffect(() => {
    setKeyword(query.q)
    setSort(query.type ? query?.type : POST_SEARCH_SORT)
  }, [query.q,query?.type])
  useEffect(() => {
    setLoading(true)
    const delayDebounceFn = setTimeout(() => {
      if (keyword?.length > 0) {
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
          <div className='mb-2'>
            <div className='animate-pulse bg-gray-300 w-full h-14 mr-2 rounded-md' />
          </div>
          <div className='mb-2'>
            <div className='animate-pulse bg-gray-300 w-full h-14 mr-2 rounded-md' />
          </div>
          <div className='mb-2'>
            <div className='animate-pulse bg-gray-300 w-full h-14 mr-2 rounded-md' />
          </div>
        </>
      )
    }
    if (result?.length == 0 || keyword?.length == 0) {
      return (
        <div className='w-full text-center mt-4'>
          <span className='text-center py-5'>Không có kết quả</span>
        </div>
      )
    }
    switch (sort) {
      case POST_SEARCH_SORT:
        return _.map(result, (item: any) => (
          <div className='border-x md:border-t md:mb-3 md:rounded-md'>
            <Posts
            key={item.id}
            id={item.id}
            title={item.title}
            slug={item.slug}
            tags={item.tags}
            content={item.content}
            voteCount={item.voteCount}
            commentCount={item.commentCount}
            isBookmark={item.bookmark}
            author={item.account}
            createdAt={item.createdAt}
          />
            </div>
         
        ))
      case USER_SEARCH_SORT:
        return _.map(result, (item: any) => (
          <>
            <div className='relative hover:cursor-pointer border md:mb-4 p-2 md:rounded-lg bg-white'>
              <div className='flex items-center'>
                <div className='mr-2'>
                  <img
                    className='md:w-20 md:h-20 w-12 h-12 rounded-full'
                    src={item?.avatar}
                    alt={item?.name}
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
            </div>
          </>
        ))
      case TAG_SEARCH_SORT:
        return _.map(result, (item: any) => (
          <TagItemSearch
            id={item?.id}
            icon={item?.icon}
            name={item?.name}
            desc={item?.desc}
            isFollowing={item?.follow}
            tag_follow_count={item?.tag_follow_count}
          />
        ))
    }
  }
  return (
    <>
      <SEO title='Tìm kiếm' />

      <div className='w-full md:max-w-[60%] mt-4 m-auto border bg-gray-50 p-3 rounded-md'>
        <input
          value={keyword}
          onChange={(value) => setKeyword(value.target.value)}
          className='w-full px-5 py-5 mb-4 text-4xl rounded-md outline-none border'
          placeholder='Tìm kiếm...'
        />

        <div className='flex space-x-1 rounded-xl bg-gray-400/20 p-1 mb-3'>
          <button
            onClick={() => {
              setLoading(true)
              setResult([])
              setSort(POST_SEARCH_SORT)
            }}
            className={classNames(
              'ring-white  w-full rounded-lg py-2.5 text-sm leading-5 text-gray-700 hover:bg-gray-100',
              sort == POST_SEARCH_SORT &&
                'bg-white hover:bg-white border font-medium'
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
              'ring-white  w-full rounded-lg py-2.5 text-sm leading-5 text-gray-700 hover:bg-gray-100',
              sort == USER_SEARCH_SORT &&
                'bg-white hover:bg-white border font-medium'
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
              'ring-white  w-full rounded-lg py-2.5 text-sm leading-5 text-gray-700 hover:bg-gray-100',
              sort == TAG_SEARCH_SORT &&
                'bg-white hover:bg-white border font-medium'
            )}>
            Thẻ
          </button>
        </div>
      </div>
      <div className='w-full md:max-w-[60%] md:mt-3 m-auto min-h-[60vh] '>
        {renderData()}
      </div>
    </>
  )
}
Search.Layout = MainLayout
Search.sidebarRight = false
Search.SidebarLeft = false
Search.requestAuth = false
export default Search
