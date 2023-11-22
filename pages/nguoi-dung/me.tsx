import React, { useEffect, useState } from 'react'
import { UseInfo } from '@/components/account'
import { MainLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import SEO from '@bradgarropy/next-seo'
import useSWR from 'swr'
type Props = {}

const MeProfile: NextPageWithLayout = (props: Props) => {
  const { data: myProfile } = useSWR<any>('/my/profile', {
    dedupingInterval: 15 * 60 * 1000,
    revalidateOnFocus: false,
  })
  const { data: myPosts } = useSWR<any>('/my/posts', {
    dedupingInterval: 15 * 60 * 1000,
    revalidateOnFocus: false,
  })
  const { data: myComments } = useSWR<any>('/my/comments', {
    dedupingInterval: 15 * 60 * 1000,
    revalidateOnFocus: false,
  })
  let loading = !myProfile?.info || !myPosts || !myComments
  return (
    <>
      <SEO
        title={myProfile?.info?.name}
        description={myProfile?.info?.bio}
        facebook={{
          image: myProfile?.info?.avatar,
          url: `/nguoi-dung/${myProfile?.info?.username}`,
          type: 'website',
        }}
      />
      <div className='max-w-5xl m-auto'>
        <UseInfo
          isMe={true}
          loading={loading}
          info={myProfile?.info}
          badges={myProfile?.badges}
          contacts={myProfile?.contacts}
          posts={myPosts}
          comments={myComments}
        />
      </div>
    </>
  )
}
MeProfile.Layout = MainLayout
MeProfile.sidebarRight = false
MeProfile.SidebarLeft = false
MeProfile.requestAuth = true
export default MeProfile
