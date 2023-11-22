import { tagApi } from '@/api-client'
import { useAuth } from '@/hooks'
import { useTagsFollow } from '@/hooks/use-tag'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ComponentRequestAuth } from './layouts/common'

interface TagItemProps {
  id: number
  icon: string
  slug: string
  color_bg: string
  name: string
  description: string
  tag_follow_count: number
  follow: boolean
  posts_use: number
  bg_color: string
}
function classNames(...classNames: any) {
  return classNames.filter(Boolean).join(' ')
}
export function TagItem(item: TagItemProps) {
  const [follow, setFollow] = useState(item?.follow)
  const [loader, setLoader] = useState(false)

  const { profile } = useAuth()
  const { followTag } = useTagsFollow()
  const [followCount, setFollowCount] = useState(item?.tag_follow_count)
  const handleFollow = async (id: number) => {
    setFollow(!follow)
    setLoader(true)
    if (follow) {
      setFollowCount(followCount - 1)
    } else {
      setFollowCount(followCount + 1)
    }
    await followTag(id).then((res: any) => {
      console.log('res ', res)
      setLoader(false)
      setFollow(res?.follow)
      setFollowCount(res?.tag_follow_count)
    })
  }
  useEffect(() => {
    if (!profile?.name) {
      setFollow(false)
      setLoader(true)
    }
  }, [profile?.name])
  return (
    <>
      <div
        key={item?.id}
        className={`border bg-white dark:bg-slate-900 border-t-[12px] dark:border-slate-700  rounded-md p-3`}>
        <div className='mb-3'>
          <Link href={`/tag/${item?.slug}`}>
            <a
              className={`px-2 text-lg font-medium  rounded-sm py-1 `}>
              <span>
                #
              </span>
              {item?.name}
            </a>
          </Link>
          <div className='mt-2 max-h-[50px] min-h-[50px] truncate overflow-hidden'>{item?.description}</div>
        </div>
        <div className='flex justify-between'>
          <div className='text-sm text-gray-500 mr-2'>
            {followCount} lượt theo dõi
          </div>
          <div className='text-sm text-gray-500'>
            {item?.posts_use} bài đăng
          </div>
        </div>
        <ComponentRequestAuth>
          <button
            onClick={() => {
              if(profile?.name){
                handleFollow(item?.id)
              }
            }}
            className={classNames(
              'w-full py-2 px-2 mt-2 rounded-md border font-medium text-white z-10',
              follow ? 'bg-indigo-400' : 'bg-indigo-600'
            )}>
            {follow ? 'Đã theo dõi' : 'Theo dõi'}
          </button>
        </ComponentRequestAuth>
      </div>
    </>
  )
}
