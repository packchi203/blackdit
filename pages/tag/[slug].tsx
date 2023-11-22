import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import _ from 'lodash'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Filter, Posts } from '@/components'
import { MainLayout } from '@/components/layouts'
import { ComponentRequestAuth } from '@/components/layouts/common'
import { useAuth } from '@/hooks'
import { useTagsFollow } from '@/hooks/use-tag'
import { SORT_POST_NEW, SORT_POST_HOT } from '@/constants'
import { FunnelIcon } from '@heroicons/react/24/outline'
import { tagApi } from '@/api-client'
import { PostModel } from '@/models'
type Props = {}
function classNames(...classNames: any) {
  return classNames.filter(Boolean).join(' ')
}
const Tag = (props: Props) => {
  const router = useRouter()
  let slug: string = router?.query?.slug as string
  const [posts, setPosts] = useState<Array<PostModel>>([])
  const [noMore, setNoMore] = useState(true)
  const [page, setPage] = useState(2)
  const [sortType, setSortType] = useState('relevant')
  const [sortPostsByTags, setSortPostsByTags] = useState('')

  const { profile, fistLoading } = useAuth()
  const { followTag } = useTagsFollow()
  const [follow, setFollow] = useState(false)
  const [followCount, setFollowCount] = useState(0)
  const [loader, setLoader] = useState(false)
  const {
    data: tagDetails,
    error,
    mutate,
  } = useSWR<any>(`/tag/${slug}/details`, {
    dedupingInterval: 5 * 60 * 1000,
    revalidateOnFocus: false,
  })

  const handleSort = async () => {}
  useEffect(() => {
    setFollow(tagDetails?.follow)
    setFollowCount(tagDetails?.tag_follow_count)
  }, [tagDetails?.follow, slug])
  useEffect(() => {
    fetchInitDataPosts()
  }, [slug,sortType])

  const fetchInitDataPosts = async () => {
    setLoader(true)
    setNoMore(true)
    await tagApi.filterPostsByTag(slug, sortType, 1).then((res: any) => {
      setLoader(false)
      setPosts(res?.content)
      setPage(2)
    })
  }
  const fetchWhenScroll = async () => {
    const result = await await tagApi
      .filterPostsByTag(slug, sortType, page)
      .then((res: any) => {
        return res?.content
      })
    setPosts([...posts, ...result])
    if (result.length === 0 || result < 2) {
      setNoMore(false)
    }
    setPage(page + 1)
  }

  const handleFollow = async (id: number) => {
    setFollow(!follow)
    setLoader(true)
    if (follow) {
      setFollowCount(followCount - 1)
    } else {
      setFollowCount(followCount + 1)
    }
    await followTag(id).then((res: any) => {
      setLoader(false)
      setFollow(res?.follow)
      setFollowCount(res?.tag_follow_count)
      mutate()
    })
  }
  let loading = tagDetails === undefined && error === undefined
  const renderPosts = () => {
    if (loader) {
      return (
        <>
          {Array.from(Array(3), (e, i) => {
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
    if (posts?.length == 0) {
      return <div className='text-center mt-4 py-4'>Không có gì ¯\_(ツ)_/¯</div>
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
            <div
              className='py-5 dark:bg-slate-900'
              style={{ textAlign: 'center' }}>
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
    <>
      <div>
        <div>
          {loading ? (
            <>
              <div className='w-full mb-5 border-t-8 border-indigo-500 bg-white dark:bg-slate-900 p-4 rounded-md flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='animate-pulse bg-gray-300 w-24 h-24 rounded-md' />
                  <div className='ml-2'>
                    <div className='animate-pulse bg-gray-300 w-32 lg:w-56 h-6 mb-2 rounded-md' />
                    <div className='animate-pulse bg-gray-300 w-40 lg:w-80  h-4 rounded-md' />
                  </div>
                </div>
                <div className='animate-pulse bg-gray-300 h-10 w-28 rounded-md' />
              </div>
            </>
          ) : (
            <>
              <div className='w-full mb-5 border border-b-gray-200 border-x-gray-200 dark:border-x-slate-700 dark:border-b-slate-700 border-t-8 border-indigo-500 bg-white dark:bg-slate-900  p-4 rounded-md flex items-center justify-between'>
                <div className='flex items-center'>
                  {tagDetails?.icon ? (
                    <img
                      src={tagDetails?.icon}
                      className='w-24 h-24 object-contain mr-3'
                    />
                  ) : (
                    <h2 className='text-4xl font-semibold mr-3'>#</h2>
                  )}
                  <div>
                    <h2 className='text-2xl font-bold'>{tagDetails?.name}</h2>

                    <p className='max-w-md'> {tagDetails?.desc}</p>
                    <div className='md:hidden block'>
                      <ComponentRequestAuth>
                        <button
                          onClick={() => {
                            if (profile?.name) {
                              handleFollow(tagDetails?.id)
                            }
                          }}
                          disabled={loader}
                          className={classNames(
                            ' py-2 px-2 mt-1 rounded-md border text-xs font-medium text-white ',
                            follow ? 'bg-indigo-400' : 'bg-indigo-600'
                          )}>
                          {follow ? 'Đã theo dõi' : 'Theo dõi'}
                        </button>
                      </ComponentRequestAuth>
                    </div>
                  </div>
                </div>
                <div className='hidden md:block'>
                  <ComponentRequestAuth>
                    <button
                      onClick={() => {
                        if (profile?.name) {
                          handleFollow(tagDetails?.id)
                        }
                      }}
                      disabled={loader}
                      className={classNames(
                        ' py-2 px-4 mt-2 rounded-md border font-medium text-white ',
                        follow ? 'bg-indigo-400' : 'bg-indigo-600'
                      )}>
                      {follow ? 'Đã theo dõi' : 'Theo dõi'}
                    </button>
                  </ComponentRequestAuth>
                </div>
              </div>
            </>
          )}
        </div>
        <div>
          <div className='w-full'>
            <h3 className=' font-semibold mb-2 px-2 md:px-0'>
              Danh sách bài viết
            </h3>
          </div>
          <div className='border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900'>
            <div className='px-4 border-b border-gray-200 dark:border-slate-700'>
              <Filter
                handleSort={() => handleSort()}
                sortPopularByTime={(value: any) => console.log(value)}
                sortPostsByTags={(value: any) => setSortPostsByTags(value)}
                sortViewPostsBy={(value: any) => setSortType(value)}
              />
            </div>
            {renderPosts()}
          </div>
        </div>
      </div>
    </>
  )
}
Tag.Layout = MainLayout
Tag.sidebarRight = true
Tag.SidebarLeft = true
Tag.requestAuth = false
export default Tag
