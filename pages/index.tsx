import { useState, useEffect } from 'react'
import _ from 'lodash'
import { MainLayout } from '@/components/layouts'
import { NextPageWithLayout, PostModel } from '@/models'
import { Filter, Posts, Welcome } from '@/components'
import { postApi } from '@/api-client'
import { useAuth } from '@/hooks'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SORT_POST_NEW, SORT_POST_HOT } from '@/constants'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
const Home: NextPageWithLayout = () => {
  const [posts, setPosts] = useState<Array<PostModel>>([])
  const [noMore, setNoMore] = useState(true)
  const [sortByTags,setSortByTags] = useState('')
  const [sortByTime,setSortByTime] = useState('')
  const [page, setPage] = useState(2)
  const [loader, setLoader] = useState(true)
  const [sortType, setSortType] = useState('relevant')
  const { profile } = useAuth()

  useEffect(() => {
    fetchInitDataPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.name, sortType])
  const filterPostByTags = async () => {
    setLoader(true)
    setNoMore(true)
    await postApi.getAllPost(sortByTags,sortType, 1,sortByTags).then((res: any) => {
      setLoader(false)
      setPosts(res?.content)
      setPage(2)
    })
  } 
  const fetchInitDataPosts = async () => {
    setLoader(true)
    setNoMore(true)
    await postApi.getAllPost(sortByTags,sortType, 1).then((res: any) => {
      setLoader(false)
      setPosts(res?.content)
      setPage(2)
    })
  }
  const fetchWhenScroll = async () => {
    const result = await await postApi
      .getAllPost(sortByTags,sortType, page)
      .then((res: any) => {
        return res?.content
      })
    setPosts([...posts, ...result])
    if (result.length === 0 || result < 2) {
      setNoMore(false)
    }
    setPage(page + 1)
  }
  const renderPosts = () => {
    if (loader) {
      return (
        <>
          {Array.from(Array(5), (e, i) => {
            return (
              <div
                key={i}
                className='overflow-hidden  border-b border-gray-200 w-full m-auto'>
                <div className='w-full block h-full'>
                  {/* <img alt="blog photo" src="https://i.pinimg.com/564x/69/18/6a/69186a31ada4b1bf94edae291f54ec85.jpg" className="max-h-40 w-full object-cover" /> */}
                  <div className='bg-white  dark:bg-slate-900 w-full p-4'>
                    <div className='animate-pulse  bg-gray-300 w-72 rounded-md h-8' />
                    <div className='flex flex-wrap mb-2  justify-starts items-center mt-2'>
                      <div className='animate-pulse  bg-gray-300 w-96 rounded-md h-8' />
                    </div>
                    <div className='flex justify-between items-end'>
                      <div className='animate-pulse  bg-gray-300 w-[70%] rounded-md h-16' />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </>
      )
    }
    return (
      <>
        <InfiniteScroll
          next={fetchWhenScroll}
          dataLength={posts.length}
          hasMore={noMore}
          loader={
            <div className='overflow-hidden  border-b border-gray-200 dark:bg-slate-900 w-full m-auto'>
              <div className='w-full block h-full'>
                {/* <img alt="blog photo" src="https://i.pinimg.com/564x/69/18/6a/69186a31ada4b1bf94edae291f54ec85.jpg" className="max-h-40 w-full object-cover" /> */}
                <div className='bg-white  dark:bg-slate-900 w-full p-4'>
                  <div className='animate-pulse  bg-gray-300 w-72 rounded-md h-8' />
                  <div className='flex flex-wrap mb-2  justify-starts items-center mt-2'>
                    <div className='animate-pulse  bg-gray-300 w-96 rounded-md h-8' />
                  </div>
                  <div className='flex justify-between items-end'>
                    <div className='animate-pulse  bg-gray-300 w-[70%] rounded-md h-16' />
                  </div>
                </div>
              </div>
            </div>
          }
          endMessage={
            <div className='py-5 dark:bg-slate-900' style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </div>
          }>
          {_.map(posts, (item) => (
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
              viewCount={item.viewCount}
            />
          ))}
        </InfiniteScroll>
      </>
    )
  }
  return (
    <div>
      <Welcome />
      <div className='md:border border-gray-200 dark:border-gray-500 md:rounded-lg overflow-hidden bg-white dark:bg-slate-900'>
        <div className='bg-white  px-4 border-b border-gray-200 dark:border-gray-500 dark:bg-slate-900'>
          {profile?.name && (
            <div className='flex justify-end mb-4 md:hidden mt-5 md:mt-0'>
              <Link href={'/bai-dang/them-moi'}>
                <a className='px-2 flex bg-gray-50 text-sm md:hidden hover:bg-gray-100 py-2 border rounded-lg dark:bg-blue-600 dark:border-0 dark:text-gray-100'>
                  <PlusIcon
                    className='-ml-1 mr-2 h-5 w-5 text-gray-500 dark:text-gray-100'
                    aria-hidden='true'
                  />
                  Tạo bài đăng
                </a>
              </Link>
            </div>
          )}
          <Filter handleSort={()=>filterPostByTags()}  sortPostsByTags={(value:any)=>setSortByTags(value)} sortViewPostsBy={(value: any) => setSortType(value)} />
        </div>
        {renderPosts()}
      </div>
    </div>
  )
}

Home.Layout = MainLayout
Home.sidebarRight = true
Home.SidebarLeft = true
Home.requestAuth = false
export default Home
