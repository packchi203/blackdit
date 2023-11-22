import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import {
  MinusIcon,
  ArrowsPointingOutIcon,
  ChatBubbleOvalLeftIcon,
  ArrowUturnRightIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline'
import Zoom from 'react-medium-image-zoom'
import { VoteComponent } from './vote'
import { FunctionallyButtons } from './functionally_buttons'
import { Account } from '@/models'
import { Comment } from '@/models/comment'
import { commentApi } from '@/api-client/comment-api'
import _ from 'lodash'
import Link from 'next/link'
import { useAuth } from '@/hooks'
import format_date from '@/utils/format_date'
import { ComponentRequestAuth } from './layouts/common'
import { useRouter } from 'next/router'
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
})
interface AnswerProps {
  id: number
  content: string
  account: Account
  voteType: string
  voteCount: number
  vote: boolean
  reply: Array<Comment>
  bookmark: boolean
  post_id: number
  createdAt: string
}
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function Answer({
  id,
  account,
  content,
  voteCount,
  voteType,
  reply,
  post_id,
  bookmark,
  createdAt,
}: AnswerProps) {
  const router = useRouter()
  const scrollToFormReply = useRef<any>([])
  const [clicked, setClicked] = useState<any>(0)
  const [showFormComment, setShowFormComment] = useState(false)
  const [idCommentReply, setIdCommentReply] = useState<any>()
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [replyList, setReplyList] = useState<any>([])
  const { profile, fistLoading } = useAuth()
  const handleToggle = (index: any) => {
    if (clicked === index) {
      return setClicked(0)
    }
    setClicked(index)
  }
  useEffect(() => {
    mergeReply()
  }, [])
 
    const handleShowFormComment = () => {
    setShowFormComment(true)
  }
  const replyComment = async () => {
    if (value == '') return
    setLoading(true)
    await commentApi
      .replyComment(post_id, value, { id: idCommentReply?.id })
      .then((res: any) => {
        setReplyList([res, ...replyList])
        setValue('')
        setLoading(false)
      })
  }
  const mergeReply = async () => {
    let array: any = []
    const AppendReplyComments = async (reply: any) => {
      if (reply.length == 0) {
        return
      }
      for (let i = 0; i < reply.length; i++) {
        array = [...array, reply[i]]
        console.log(array)
        await AppendReplyComments(reply[i].reply)
      }
    }
    await AppendReplyComments(reply)
    await setReplyList(array)
    setTimeout(() => {
      if (router.query.to_comment) {
        scrollToFormReply.current[`${router.query.to_comment}`]?.scrollIntoView(
          {
            behavior: 'smooth',
            block: 'center',
          }
        )
      }
    }, 500)
  }

  return (
    <>
      <div
        ref={(element) => {
          scrollToFormReply.current[`comment-${id}`] = element
        }}>
        {clicked == id ? (
          <div className=' px-2 md:px-5  mb-5'>
            <div className='flex  py-3 bg-gray-200 rounded-md'>
              <div className='w-1/12 hidden md:flex justify-center '>
                <div className='text-center hidden md:flex flex-col justify-center items-center'>
                  <button onClick={() => setClicked('')} title='Phóng To'>
                    <ArrowsPointingOutIcon className='h-6 w-6' />
                  </button>
                </div>
              </div>
              <div className='w-11/12 dark:text-gray-800 px-2 border-gray-100'>
                <div className='flex'>
                  <span className='mr-2 flex items-center'>
                    <img
                      src={account.imageUrl}
                      className='h-6 w-6 rounded-full mr-2'
                    />
                    <a>{account.name}</a>
                  </span>
                  <span className='ml-3 flex items-center text-gray-500'>
                    <ArrowUturnRightIcon className='w-3 h-3 text-gray-700 mr-2' />{' '}
                    {replyList.length} câu trả lời
                  </span>
                </div>
              </div>
              <div className='w-1/12 flex md:hidden justify-center '>
                <div className='text-center flex flex-col justify-center items-center'>
                  <button onClick={() => setClicked('')} title='Phóng To'>
                    <ArrowsPointingOutIcon className='h-4 w-4' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex md:py-5'>
            <div className='w-1/12 hidden md:block relative'>
              <button
                onClick={() => handleToggle(id)}
                title='Thu nhỏ'
                className='mb-2 w-full flex justify-center pb-4'>
                <MinusIcon className='h-6 w-6' />
              </button>
              <VoteComponent
                id={id}
                voteCount={voteCount}
                userVote={voteType}
                subjectVote='COMMENT'
                getNotify={false}
              />
            </div>
            <div className='w-full md:w-11/12  px-2 py-2 md:pr-5  dark:text-gray-800 pb-1'>
              <div
                className={classNames(
                  router.query.to_comment === `comment-${id}` &&
                    ' bg-indigo-100 p-2 rounded-lg border border-indigo-500'
                )}>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                  <Link href={`/nguoi-dung/${account.username}`}>
                      <a className='flex item-center mr-2'>
                        {account.imageUrl ? (
                          <img
                            src={account.imageUrl}
                            className='h-6 w-6 rounded-full mr-2'
                            alt={account.name}
                          />
                        ) : (
                          <div className='h-6 w-6 rounded-full flex justify-center items-center bg-yellow-600 text-white mr-2'>
                            {account.name[0]}
                          </div>
                        )}
                        {account.name}
                      </a>
                    </Link>
                    <span className='text-sm text-gray-400'>
                      {format_date.formatDate(createdAt)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggle(id)}
                    title='Thu nhỏ'
                    className='p-2 rounded-full hover:bg-gray-100 block md:hidden '>
                    <MinusIcon className='h-6 w-6' />
                  </button>
                </div>
                <span className='text-xs text-gray-400'>
                  Nội dung câu trả lời :
                </span>
                <div className='ml-2 mb-2 mt-2'>
                  <Zoom>
                    <MarkdownPreview source={content} />
                  </Zoom>
                </div>
                <div className='flex justify-between'>
                  <ComponentRequestAuth>
                    <button
                      disabled={!profile?.name}
                      onClick={() => {
                        scrollToFormReply.current['formReply']?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        })
                        handleShowFormComment()
                        setIdCommentReply({
                          id: id,
                          account: account,
                        })
                      }}
                      className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
                      <ChatBubbleOvalLeftIcon className='h-4 w-4 mr-2' />
                      <span>thêm bình luận</span>
                    </button>
                  </ComponentRequestAuth>

                  <FunctionallyButtons
                    id={id}
                    subject='COMMENT'
                    isBookmark={bookmark}
                  />
                </div>
              </div>
              <ul className='my-3 ml-3 pl-6 border-l-2 border-l-gray-300'>
                {_.map(
                  _.orderBy(replyList, (it) => new Date(it.createdAt), ['asc']),
                  (item) => (
                    <li
                      ref={(element) => {
                        scrollToFormReply.current[`comment-${item?.id}`] =
                          element
                      }}
                      id={`comment-${item?.id}`}
                      key={item?.id}
                      className={classNames(
                        'text-sm p-2 h-full rounded-md border mb-2',
                        router.query.to_comment === `comment-${item?.id}` &&
                          'border-indigo-600 bg-indigo-100'
                      )}>
                      {id !== item?.parent?.id && (
                        <div className='bg-gray-100 border rounded-md p-2 mb-2'>
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                              <img
                                src={item?.parent?.account?.imageUrl}
                                className='h-5 w-5 rounded-full mr-2'
                              />
                              {item?.parent.account?.name}
                            </div>
                            <button
                              onClick={() => {
                                scrollToFormReply.current[
                                  `comment-${item?.parent?.id}`
                                ]?.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'center',
                                })
                                router.push(
                                  `/bai-dang/${router.query.slug}?to_comment=comment-${item?.parent?.id}`,
                                  undefined,
                                  { shallow: true }
                                )
                              }}
                              className='hover:bg-gray-200 p-2 rounded-full'>
                              <ArrowUpIcon className='h-4 w-4 text-gray-800' />
                            </button>
                          </div>
                          <div className='pt-2 max-h-5 cut-text-reply'>
                            <MarkdownPreview source={item?.parent?.content} />
                          </div>
                        </div>
                      )}

                      <div className='flex items-center mt-3'>
                        <Link href={`/nguoi-dung/${item?.account?.username}`}>
                          <a className='flex item-center mr-2 text-sm'>
                            <img
                              src={item?.account?.imageUrl}
                              className='h-6 w-6 rounded-full mr-2'
                            />
                            {item?.account?.name}
                          </a>
                        </Link>
                        <span className='text-sm text-gray-400'>
                          {format_date?.formatDate(item.createdAt)}
                        </span>
                      </div>
                      <div className='mt-2 px-3'>
                        <MarkdownPreview source={item?.content} />
                        <div className='flex justify-end'>
                          <ComponentRequestAuth>
                            <button
                              disabled={!profile?.name}
                              onClick={() => {
                                scrollToFormReply.current[
                                  'formReply'
                                ]?.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'center',
                                })
                                setShowFormComment(true)

                                setIdCommentReply(item)
                              }}
                              className='flex items-center mr-2 text-sm p-1 text-gray-500 hover:bg-gray-200 rounded-sm'>
                              <ArrowUturnRightIcon className='h-4 w-4 mr-2' />
                              <span>Trả lời bình luận</span>
                            </button>
                          </ComponentRequestAuth>
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
              <div
                ref={(element) => {
                  scrollToFormReply.current['formReply'] = element
                }}>
                {showFormComment && (
                  <div
                    id={`form-reply-${id}`}
                    className='p-2 border border-indigo-700 rounded-md top-16 bg-gray-50'>
                    {idCommentReply?.account?.username !==
                      profile?.username && (
                      <div className='w-full bg-gray-100 border rounded-md p-2 mt-3'>
                        <div className='flex items-center mr-2'>
                          <ArrowUturnRightIcon className='w-4 h-4 mr-2' />
                          <div className='flex items-center'>
                            <img
                              src={idCommentReply?.account?.imageUrl}
                              className='h-5 w-5 rounded-full mr-2'
                            />
                            {idCommentReply?.account?.name}
                          </div>
                        </div>
                      </div>
                    )}

                    <textarea
                      value={value}
                      onChange={(value) => setValue(value.target.value)}
                      className='mt-2 w-full rounded-md min-h-[100px] border  outline-none p-2 text-gray-600'
                      placeholder='Viết bình luận'
                    />
                    <div className='flex justify-end mt-2'>
                      <button
                        disabled={loading}
                        onClick={() => setShowFormComment(false)}
                        className='py-1 px-4 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300'>
                        Hủy
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => replyComment()}
                        className='py-1 px-4 text-gray-700 bg-blue-200 rounded-md ml-3 hover:bg-blue-300'>
                        {loading ? 'Đang gửi' : 'Thêm bình luận'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
