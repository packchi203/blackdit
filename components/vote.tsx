import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks'
import {
  ChevronUpIcon,
  ChevronDownIcon,
  BellIcon,
} from '@heroicons/react/24/outline'
import { postApi } from '@/api-client'
import { commentApi } from '@/api-client/comment-api'
import { ComponentRequestAuth } from './layouts/common'

type VoteProps = {
  id: number
  subjectVote: string
  upVote?: any
  downVote?: any
  voteCount: number
  userVote: string
  getNotify?: boolean
  loader?: boolean
}
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function VoteComponent({
  id,
  subjectVote,
  voteCount,
  userVote,
  getNotify,
  loader,
}: VoteProps) {
  const { profile, fistLoading } = useAuth()
  const [vote, setVoteCount] = useState(0)
  const [voteType, setVoteType] = useState('UNDEFINED')
  const [loadWhenVote, setLoadWhenVote] = useState(false)
  useEffect(() => {
    setVoteCount(voteCount)
    setVoteType(userVote)
    if (!profile?.name) {
      setVoteType('UNDEFINED')
    }
  }, [userVote, voteCount, profile])
  const handleUpVote = async (e: any) => {
    e.preventDefault()
    handleChangeVote('UPVOTE')
    setLoadWhenVote(true)
    if (subjectVote === 'POST') {
      voteForPost(id, 1)
    } else if (subjectVote === 'COMMENT') {
      voteAnswers(id, 1)
    }
  }
  const handleDownVote = async (e: any) => {
    e.preventDefault()
    setLoadWhenVote(true)
    if (subjectVote === 'POST') {
      voteForPost(id, -1)
    } else if (subjectVote === 'COMMENT') {
      voteAnswers(id, -1)
    }
    handleChangeVote('DOWN_VOTE')
  }
  const handleChangeVote = async (type: string) => {
    if (type === 'UPVOTE') {
      if (voteType == 'UPVOTE') {
        setVoteType('UNDEFINED')
        setVoteCount(vote - 1)
      } else if (voteType === 'DOWN_VOTE') {
        setVoteType('UPVOTE')
        setVoteCount(vote + 2)
      } else if (voteType === 'UNDEFINED') {
        setVoteCount(vote + 1)
        setVoteType('UPVOTE')
      }
    } else if (type === 'DOWN_VOTE') {
      if (voteType === 'DOWN_VOTE') {
        setVoteType('UNDEFINED')
        setVoteCount(vote + 1)
      } else if (voteType === 'UPVOTE') {
        setVoteType('DOWN_VOTE')
        setVoteCount(vote - 2)
      } else if (voteType === 'UNDEFINED') {
        setVoteType('DOWN_VOTE')
        setVoteCount(vote - 1)
      }
    }
  }
  const voteForPost = async (id: number, type: number) => {
    await postApi.votePost(id, type).then((res: any) => {
      setVoteType(res?.voteType)
      setVoteCount(res?.vote_count)
      setLoadWhenVote(false)
    })
  }
  const voteAnswers = async (id: number, type: number) => {
    await commentApi.voteComment(id, type).then((res: any) => {
      setVoteCount(res?.vote_count)
      setVoteType(res?.voteType)
      setLoadWhenVote(false)
    })
  }
  const renderContent = () => {
    if (loader) {
      return (
        <>
          <ul className='w-full sticky top-0 z-10 block'>
            <li className='text-center flex flex-col justify-center items-center mb-4'>
              <div className='animate-pulse bg-gray-300 w-5 h-5 rounded-md' />
            </li>
            <li className='text-center  flex flex-col justify-center items-center mb-4'>
              <div className='animate-pulse bg-gray-300 w-4 h-4 rounded-full' />
            </li>
            <li className='text-center flex flex-col justify-center items-center mb-4'>
              <div className='animate-pulse bg-gray-300 w-5 h-5 rounded-md' />
            </li>
          </ul>
        </>
      )
    }
    return (
      <>
        <ul className='w-full sticky top-20 z-10  block'>
          <li className='text-center flex flex-col justify-center items-center mb-4'>
            <ComponentRequestAuth>
              <button
                disabled={loadWhenVote || !profile?.name}
                onClick={handleUpVote}
                className={classNames(
                  'hover:text-red-500 p-1 font-extrabold rounded-md text-gray-400',
                  voteType === 'UPVOTE' && 'text-red-500 bg-gray-200',loadWhenVote && ('cursor-wait')
                )}>
                <ChevronUpIcon className='h-6 w-6' />
              </button>
            </ComponentRequestAuth>
          </li>
          <li className='text-center  flex flex-col justify-center items-center mb-4'>
            {vote}
          </li>
          <li className='text-center flex flex-col justify-center items-center mb-4'>
            <ComponentRequestAuth>
              <button
                disabled={loadWhenVote || !profile?.name}
                onClick={handleDownVote}
                className={classNames(
                  'hover:text-red-500 p-1  font-extrabold rounded-md text-gray-400',
                  voteType === 'DOWN_VOTE' && 'text-red-500 bg-gray-200', loadWhenVote && ('cursor-wait')
                )}>
                <ChevronDownIcon className='h-6 w-6' />
              </button>
            </ComponentRequestAuth>
          </li>
        </ul>
      </>
    )
  }
  return <>{renderContent()}</>
}
