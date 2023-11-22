import React, { useEffect, useState } from 'react'
import { ComponentRequestAuth } from '@/components/layouts/common'
import { useAuth } from '@/hooks'
import { useTagsFollow } from '@/hooks/use-tag'
import _ from 'lodash'
import { useRouter } from 'next/router'
import useSWR from 'swr'

type Props = {
  icon: string
  name: string
  desc: string
  isFollowing: boolean
  tag_follow_count: number
  id: number
}
function classNames(...classNames: any) {
  return classNames.filter(Boolean).join(' ')
}
const TagItemSearch = ({ icon, name, desc, isFollowing, id }: Props) => {
  const { profile } = useAuth()
  const { followTag } = useTagsFollow()
  const [follow, setFollow] = useState(isFollowing)
  const [followCount, setFollowCount] = useState(0)
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    if (!profile?.name) {
      setFollow(false)
    }
  }, [profile?.name])
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
    })
  }
  return (
    <>
      <div className='w-full mb-5 border bg-white p-4 rounded-md flex items-center justify-between'>
        <div className='flex items-center'>
          {icon ? (
            <img src={icon} className='w-24 h-24 object-contain mr-3' />
          ) : (
            <h2 className='text-4xl font-semibold mr-3'>#</h2>
          )}
          <div>
            <h2 className='text-2xl font-bold'>{name}</h2>
            <p className='max-w-md'> {desc}</p>
          </div>
        </div>
        <ComponentRequestAuth>
          <button
            onClick={() => {
              if (profile?.name) {
                handleFollow(id)
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
    </>
  )
}

export default TagItemSearch
