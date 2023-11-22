import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks'
import format_date from '@/utils/format_date'

export function Welcome() {
  const [display, setDisplay] = useState(true)
  const { profile } = useAuth()
  useEffect(() => {
    if (format_date.countDay(profile?.createdAt) <= 2) {
      setDisplay(true)
    } else {
      setDisplay(false)
    }
  }, [profile?.createdAt])
  return (
    <>
      {display &&  profile?.name && (
        <div className='border w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 mb-5'>
          <div className='w-full flex justify-end px-5 py-5'>
            <button
              onClick={()=>setDisplay(false)}
              type='button'
              className='text-white bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'>
              <svg
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'></path>
              </svg>
            </button>
          </div>
          <div className='pb-5 px-9'>
            <div className='text-3xl font-medium mb-3 text-white'>
              Wellcome to <br /> Blackdit.
            </div>
            <Link href={'/bai-dang/them-moi'}>
              <a className='w-full flex text-lg mb-3 font-medium border rounded-lg items-center py-4 text-white bg-white/20 backdrop-blur-sm px-5'>
                <span>✍🏾 Tạo 1 bài đăng đầu tiên.</span>
              </a>
            </Link>
            <Link href={'/tags'}>
              <a className='w-full flex text-lg mb-3 font-medium border rounded-lg items-center py-4 text-white bg-white/20 backdrop-blur-sm px-5'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 44 44'
                  width='24'
                  height='24'>
                  <g>
                    <path
                      fill='#FFD983'
                      d='M36.017 24.181L21.345 9.746C20.687 9.087 19.823 9 18.96 9H8.883C7.029 9 6 10.029 6 11.883v10.082c0 .861.089 1.723.746 2.38L21.3 39.017a3.287 3.287 0 004.688 0l10.059-10.088c1.31-1.312 1.28-3.438-.03-4.748zm-23.596-8.76a1.497 1.497 0 11-2.118-2.117 1.497 1.497 0 012.118 2.117z'></path>
                    <path
                      fill='#D99E82'
                      d='M13.952 11.772a3.66 3.66 0 00-5.179 0 3.663 3.663 0 105.18 5.18 3.664 3.664 0 00-.001-5.18zm-1.53 3.65a1.499 1.499 0 11-2.119-2.12 1.499 1.499 0 012.119 2.12z'></path>
                    <path
                      fill='#C1694F'
                      d='M12.507 14.501a1 1 0 11-1.415-1.414l8.485-8.485a1 1 0 111.415 1.414l-8.485 8.485z'></path>
                  </g>
                </svg>
                Theo dõi các Community.
              </a>
            </Link>
            <Link href={'/tai-khoan/cai-dat'}>
              <a className='w-full flex text-lg font-medium border rounded-lg items-center py-4 px-5 text-white bg-white/20 filter backdrop-blur-sm'>
                👩‍💻 Thêm thông tin cá nhân.
              </a>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
