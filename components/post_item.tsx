import { useEffect, useState } from 'react';
import Link from 'next/link';
import _ from 'lodash';
import format_date from '@/utils/format_date';
import { useRouter } from 'next/router';
import { TagModel } from '@/models';
import { Account } from '@/models/account';
import HeroIcon from './hero_icon';
import { postApi } from '@/api-client';
import { useAuth, useBookmarks } from '@/hooks';
import { ComponentRequestAuth } from './layouts/common';
import {
  ChatBubbleLeftRightIcon,
  ChevronUpDownIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

import Zoom from 'react-medium-image-zoom'
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
})
import dynamic from 'next/dynamic'
interface PostProps {
  id: number
  title?: string
  slug?: string
  tags?: Array<TagModel>
  content?: string
  author?: Account
  createdAt?: string
  isBookmark?: boolean
  commentCount?: number
  voteCount?: number
  viewCount?:number
}
export function Posts({
  id,
  title,
  slug,
  tags,
  content,
  author,
  createdAt,
  commentCount,
  voteCount,
  isBookmark,
  viewCount,
}: PostProps) {
  const [showMoreContent, setShowMoreContent] = useState(false);
  const route = useRouter();
  const { bookmarkPost } = useBookmarks();
  const [statusBookmark, setStatusBookmark] = useState<any>(isBookmark);
  useEffect(() => {
    setStatusBookmark(isBookmark);
  }, [isBookmark]);
  const { profile } = useAuth()
  const handleBookmark = async (e: any) => {
    e.preventDefault()
    try {
      setStatusBookmark(!statusBookmark)
      let res = await bookmarkPost(id)
      if (res.status == 200) {
        setStatusBookmark(res.data)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (!profile?.name) {
      setStatusBookmark(false)
    }
  }, [profile?.name])
  
  return (
    <>
      <div className='overflow-hidden w-full border-b border-gray-200 dark:border-gray-600 m-auto'>
        <div className='w-full block h-full'>
        <div className='flex items-center mt-4 author'>
                <a href='#' className='block relative'>
                  {author?.imageUrl ? (
                    <img
                      className='h-6 w-6 object-cover relative overflow-hidden rounded-full'
                      src={author?.imageUrl}
                      alt={author?.name}
                    />
                  ) : (
                    <div className='h-6 w-6 rounded-full flex justify-center items-center bg-yellow-600 text-white'>
                      {author?.name[0]}
                    </div>
                  )}
                </a>
    
                <div className='flex flex-col justify-between ml-4 text-xs'>
                  <Link href={`/nguoi-dung/${author?.username}`}>
                    <a className='text-gray-800 hover:underline dark:text-white'>
                      {author?.name}
                    </a>
                  </Link>
                  <p className='text-gray-400 dark:text-gray-300'>
                    {format_date.formatDate(createdAt)}
                  </p>
                </div>
              </div>
          
          {/* <img alt="blog photo" src="https://i.pinimg.com/564x/69/18/6a/69186a31ada4b1bf94edae291f54ec85.jpg" className="max-h-40 w-full object-cover" /> */}
          <div className='bg-white hover:bg-gray-50 hover:dark:bg-slate-800 dark:bg-slate-900 w-full p-4'>
            <Link href={`/bai-dang/[slug]`} as={`/bai-dang/${slug}`}>
              <a className='text-gray-800 dark:text-white text-xl font-medium mb-2 hover:text-indigo-600'>
                {title}
              </a>
            </Link>
            <div className='flex flex-wrap mb-2  justify-starts items-center mt-2'>
              {_.map(tags, (item) => (
                <Link href={`/tag/${item?.slug}`} key={item.id}>
                  <a className='text-xs mr-2 py-1 px-1.5 text-gray-500 border bg-blue-50 hover:bg-blue-100 dark:bg-gray-500 dark:text-gray-100 rounded-md'>
                    {item.name}
                  </a>
                </Link>
              ))}

          
            </div>
                    
        <div className='mb-3'>
        <div className='post-details relative mt-2'>
           
           {typeof content === 'string' ? (
             showMoreContent ? (
               <MarkdownPreview source={content} />
             ) : (
               content.length > 500 ? (
                 <div>
                   <MarkdownPreview source={content.slice(0, 200)} />
                   <button
                     onClick={() => setShowMoreContent(!showMoreContent)}
                     className='text-indigo-600 hover:underline cursor-pointer'
                   >
                     {showMoreContent ? 'Ẩn đi' : '...Xem thêm'}
                   </button>
                 
                 </div>
               ) : (
                 <MarkdownPreview source={content} />
               )
             )
           ) : (
             <p>Không có nội dung</p>
           )}
         </div>
            </div>
            
            <div className='flex justify-between items-end'>
              
              <div className='flex items-center mt-4'>
                <a href='#' className='block relative'>
                
                </a>
    
                <div className='flex flex-col justify-between ml-4 text-xs'>
                  <Link href={`/nguoi-dung/${author?.username}`}>
                    <a className='text-gray-800 hover:underline dark:text-white'>
                   
                    </a>
                  </Link>
                  <p className='text-gray-400 dark:text-gray-300'>
                
                  </p>
                </div>
              </div>
              <div className='flex items-center mt-4 text-sm text-gray-600 dark:text-gray-300'>
                <Link href={`/bai-dang/${slug}`}>
                  <a className='flex items-center mr-1 md:mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md'>
                    {/* <ChevronUpIcon className='h-5 w-5 mr-1' /> */}
                    <span className='flex items-center'>
                      <ChevronUpDownIcon className='w-4 h-4 text-gray-600 mr-1' />
                      {voteCount}
                      <span className='hidden md:block ml-1'>Đánh giá</span>
                    </span>
                  </a>
                </Link>
                <Link href={`/bai-dang/${slug}/#comments`}>
                  <a className='flex items-center p-2 mr-1 md:mr-4 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md'>
                    {/* <ChatBubbleOvalLeftIcon className='h-5 w-5 mr-1' />{' '} */}
                    <span className='flex items-center'>
                      {' '}
                      <ChatBubbleLeftRightIcon className='w-4 h-4 text-gray-600 mr-1 ' />{' '}
                      {commentCount}{' '}
                      <span className='hidden md:block ml-1'>Bình luận</span>
                    </span>
                  </a>
                </Link>
                <Link href={`/bai-dang/${slug}`}>
                  <a className='flex items-center mr-1 md:mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md'>
                    {/* <ChevronUpIcon className='h-5 w-5 mr-1' /> */}
                    <span className='flex items-center'>
                      <EyeIcon className='w-4 h-4 text-gray-600 mr-1' />
                      {viewCount}
                      <span className='hidden md:block ml-1'>Lượt xem</span>
                    </span>
                  </a>
                </Link>
                <ComponentRequestAuth>
                  <button
                    disabled={!profile?.name}
                    onClick={handleBookmark}
                    className='p-3 hover:bg-indigo-100 dark:hover:bg-gray-500 rounded-full hover:cursor-pointer'>
                    <HeroIcon
                      name='BookmarkIcon'
                      className='h-4 w-4'
                      outline={statusBookmark}
                    />
                  </button>
                </ComponentRequestAuth>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
