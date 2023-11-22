import React, { useState, useEffect } from 'react'
import { MainLayout } from '@/components/layouts'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import _ from 'lodash'
import SEO from '@bradgarropy/next-seo'
import { useRouter } from 'next/router'
import { FunctionallyButtons, VoteComponent } from '@/components'
import { PostModel } from '@/models'
import { postApi } from '@/api-client'
import { GetStaticPaths, GetStaticProps, NextPageContext } from 'next'
import { Loader } from '@/components/layouts/common'
import { AnswerOfPost } from '@/components/answer_of_post'
import format_date from '@/utils/format_date'
import Zoom from 'react-medium-image-zoom'
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
})
export interface IPropType {
  post: PostModel
  slug: string
}
const DetailsPost = ({ post, slug }: any) => {
  const router = useRouter()
  const [detailPost, setDetailsPost] = useState<PostModel>()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const fetchData = async () => {
    await postApi.getDetails(slug).then((res: any) => {
      setDetailsPost(res)
      setLoader(false)
    })
  }
  if (router.isFallback) {
    return <Loader />
  }
  if (!post) return null
  const handleDeleteMyPost = async () => {
    confirm('bạn muốn xóa bài viết này.')
    await postApi.deletePost(post?.id).then((res) => {
      router.push('/')
    })
  }
  return (
    <>
      <SEO
        title={post?.title}
        description={post?.content}
        facebook={{
          url: `/bai-dang/${post?.slug}`,
          type: 'website',
        }}
      />
      <div className='w-full bg-white dark:bg-slate-900 rounded-lg border border-gray-200'>
        <div className='w-full px-2 py-2 md:px-5 md:py-5 '>
          <div
            className={`flex items-center ${
              detailPost?.myPost && 'justify-between'
            }`}>
            <div className='flex items-center'>
              <Link href={`/nguoi-dung/${post?.account?.username}`}>
                <a className='flex items-center text-sm font-[500] hover:underline mr-2'>
                  <img
                    className='h-8 w-8 rounded-full mr-1'
                    src={post?.account?.imageUrl}
                  />
                  {post?.account?.name}
                </a>
              </Link>
              <span className='text-sm text-gray-500'>
                {format_date.formatDate(post.createdAt)}
              </span>
            </div>
            {detailPost?.myPost && (
              <div className='flex'>
                <button
                  onClick={() =>
                    router.push(`/bai-dang/chinh-sua/${post?.slug}`)
                  }
                  className='px-4 bg-yellow-500/20 hover:bg-yellow-200 py-1 rounder-l rounded-l-lg'>
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteMyPost()}
                  className='px-4 bg-red-500/20 py-1 hover:bg-red-200  rounder-r rounded-r-lg'>
                  Xóa
                </button>
              </div>
            )}
          </div>
          <h1 className='text-4xl dark:text-gray-800 font-[500] mb-3 mt-2'>
            {post?.title}
          </h1>
          <div className='flex flex-wrap mb-2  justify-starts items-center mt-2 mb-3'>
            {_.map(post.tags, (item) => (
              <Link href={`/tag/${item?.slug}`} key={item.id}>
                <a className='text-sm mr-2 py-1 px-1.5 text-gray-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-md'>
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className='flex py-3 px-2 md:px-0'>
          <div className='md:w-1/12 relative hidden md:block'>
            <VoteComponent
              id={post?.id}
              loader={loader}
              subjectVote='POST'
              voteCount={detailPost?.voteCount as number}
              userVote={detailPost?.voteType as string}
              getNotify={true}
            />
          </div>
          <div className='w-full md:w-11/12 pb-1 dark:text-gray-800 pl-2 pr-3 md:pr-7 '>
            <div className='mb-3'>
              <span className='text-xs text-gray-400'>Nội dung :</span>
              <div className='post-details relative mt-2'>
                <Zoom>
                  <MarkdownPreview source={post?.content} />
                </Zoom>
              </div>
            </div>
            <div className='flex justify-end'>
              <FunctionallyButtons
                id={post?.id}
                isBookmark={detailPost?.bookmark as boolean}
                subject='POST'
              />
            </div>
          </div>
        </div>
      
      </div>
      <div id="comments">
          <AnswerOfPost id={post?.id} />
       </div>
    </>
  )
}
DetailsPost.Layout = MainLayout
DetailsPost.sidebarRight = true
DetailsPost.SidebarLeft = true
DetailsPost.requestAuth = false

export default DetailsPost

export const getStaticPaths: GetStaticPaths = async () => {
  const posts: any = await postApi.getAllPostForStaticProps().then((res) => {
    return res
  })
  const paths = posts?.map((post: any) => ({
    params: { slug: post.slug.toString() },
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  let slug = params?.slug
  const post = await postApi.getDetailsStatic(slug).then((res) => {
    return res
  })
  return {
    props: {
      post,
      slug,
    },
    revalidate: 60,
  }
}
