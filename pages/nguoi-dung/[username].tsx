import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks'
import { UseInfo } from '@/components/account'
import { MainLayout } from '@/components/layouts'
import { NextPageWithLayout } from '@/models'
import useSWR from 'swr'
import SEO from "@bradgarropy/next-seo"

type Props = {}

const AccountDetail: NextPageWithLayout = (props: Props) => {
  const { query, push,replace } = useRouter()
  const { profile } = useAuth()
  useEffect(()=>{
    if (profile?.username === query.username && profile?.username !== null){
      push('/nguoi-dung/me')
    }
  },[profile?.username])
 
  const { data: userProfile } = useSWR<any>(`user/${query?.username}/info`, {
    dedupingInterval: 15 * 60 * 1000,
    revalidateOnFocus: false,
  })
  const { data: userPosts } = useSWR<any>(`user/${query?.username}/posts`, {
    dedupingInterval: 15 * 60 * 1000,
    revalidateOnFocus: false,
  })
  const { data: userComments } = useSWR<any>(
    `user/${query?.username}/comments`,
    {
      dedupingInterval: 15 * 60 * 1000,
      revalidateOnFocus: false,
    }
  )
  let loading = !userProfile?.info || !userPosts || !userComments
  return (
    <>
    <SEO
    title={userProfile?.info?.name}
    description={userProfile?.info?.bio}
    facebook={{
      image:userProfile?.info?.avatar ,
      url: `/nguoi-dung/${userProfile?.info?.username}`,
      type: "website",
    }}
    />
    <div className='max-w-5xl m-auto'>
      <UseInfo
        loading={loading}
        info={userProfile?.info}
        badges={userProfile?.badges}
        contacts={userProfile?.contacts}
        posts={userPosts}
        comments={userComments}
      />
    </div>
    </>
   
  )
}
AccountDetail.Layout = MainLayout
AccountDetail.sidebarRight = false
AccountDetail.SidebarLeft = false
AccountDetail.requestAuth = false
export default AccountDetail
