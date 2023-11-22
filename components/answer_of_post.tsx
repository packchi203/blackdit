import React, { useState, useCallback, useEffect, useRef } from 'react'
import { commentApi } from '@/api-client/comment-api'
import { Comment } from '@/models/comment'
import _ from 'lodash'
import { Answer } from './answer'
import { AnswersForm } from './answers_form'
import { useRouter } from 'next/router'
interface AOPProps {
  id: number
}
export function AnswerOfPost({ id }: AOPProps) {
  const router = useRouter()
  const [answers, setAnswers] = useState<any>([])
  const scrollToFormReply = useRef<any>([])
  const [displayFormComm, setDisplayFormComm] = useState(false)
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadWhenSend, setLoadWhenSend] = useState(false)
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  useEffect(()=>{
    if (router?.query.to_comment) {
      scrollToFormReply.current[`${router.query.to_comment}`]?.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'center',
        }
      )
    }
  },[router?.query?.to_comment])
  const fetchData = async () => {
    setLoading(true)
    await commentApi.findCommentByPost(id).then((res: any) => {
      setAnswers(res)
      setLoading(false)
    })
  }
  const onChange = useCallback((value: any) => {
    setValue(value)
  }, [])
  const handleSend = async () => {
    if (value == '') {
      return
    }
    setLoadWhenSend(true)
    await commentApi.replyPost(id, value).then((res: any) => {
      setAnswers([res, ...answers])
      scrollToFormReply.current[`comment-${res?.id}`]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      setValue('')
      setLoadWhenSend(false)
    })
  }
  const renderComments = () => {
    if (loading) {
      return (
        <div className='bg-white px-5 py-5 border border-gray-200 mt-5 rounded-lg'>
          <div className='pl-8 mb-3'>
            <div className='flex items-center mb-3'>
              <div className='animate-pulse bg-gray-300 w-6 h-6 mr-2 rounded-full' />
              <div className='animate-pulse bg-gray-300 w-24 lg:w-64 h-4 rounded-md' />
            </div>
            <div className='pl-8'>
              <div className='animate-pulse bg-gray-300 w-30 lg:w-64 h-7 mb-2 rounded-md' />
              <div className='animate-pulse bg-gray-300 w-48 lg:w-80 h-7 mb-2 rounded-md' />
              <div className='animate-pulse bg-gray-300 w-3/5 h-7 mb-2 rounded-md' />
            </div>
          </div>
          <div>
            <div className='animate-pulse bg-gray-300 w-full h-44 rounded-md' />
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className='bg-white px-2 py-2 md:px-5 md:py-5 border border-gray-200 mt-5 rounded-lg'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-bold'>
              Có {answers?.length} bình luận:{' '}
            </h2>
            <button
              onClick={() => setDisplayFormComm(true)}
              className='px-3 py-2 bg-indigo-600 hover:bg-indigo-400 text-white rounded-lg'>
              Viết bình luận
            </button>
          </div>
          {displayFormComm && (
            <AnswersForm
              handleCancel={(value: any) => setDisplayFormComm(value)}
              loading={loadWhenSend}
              onChange={onChange}
              handleSend={handleSend}
              value={value}
            />
          )}
        </div>
        {answers.length == 0 ? (
          <div className='py-5 mt-5 px-5 text-center bg-white rounded-lg border border-gray-200'>
            Chưa có bình luận nào.
          </div>
        ) : (
          <div className='mt-5 py-5 bg-white border border-gray-200 rounded-lg'>
            {_.map(answers, (item: Comment) => (
              <>
                {item?.children == false ? (
                  <div
                    ref={(element) => {
                      scrollToFormReply.current[`comment-${id}`] = element
                    }}>
                    <Answer
                      key={item?.id}
                      post_id={id}
                      id={item?.id}
                      reply={item.reply}
                      account={item?.account}
                      content={item?.content}
                      vote={item.vote}
                      voteType={item?.voteType}
                      voteCount={item?.voteCount}
                      bookmark={item?.bookmark}
                      createdAt={item?.createdAt}
                    />
                  </div>
                ) : (
                  ''
                )}
              </>
            ))}
          </div>
        )}
      </div>
    )
  }
  return <div>{renderComments()}</div>
}
