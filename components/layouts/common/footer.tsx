import Link from 'next/link'
import React from 'react'

type Props = {}

export function Footer({}: Props) {
  return (
    <footer className='p-4 bg-white border-t border-t-gray-200 md:px-6 md:py-8 dark:bg-slate-900'>
      <div className='w-full md:max-w-[90rem] lg:max-w-[100rem] m-auto'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <Link href={'/'}>
            <a className='flex items-center mb-4 sm:mb-0'>
              <img
                className='hidden lg:block h-8 w-auto'
                src={
                  'https://res.cloudinary.com/dtwezwufx/image/upload/v1699015136/logo_ver2__cropped_nepf00.png'
                }
                alt='Workflow'
              />
            </a>
          </Link>

          <ul className='flex flex-wrap items-center mb-6 sm:mb-0'>
            <li>
              <a
                href='#'
                className='mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400'>
                Trang chủ
              </a>
            </li>
            <li>
              <a
                href='#'
                className='mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400'>
                Thẻ 
              </a>
            </li>
            <li>
              <a
                href='#'
                className='mr-4 text-sm text-gray-500 hover:underline md:mr-6 dark:text-gray-400'>
                Hỏi đáp
              </a>
            </li>
            <li>
              <a
                href='#'
                className='text-sm text-gray-500 hover:underline dark:text-gray-400'>
                Bàn luận
              </a>
            </li>
          </ul>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2022{' '}
          <a className='hover:underline'>
           Blackdit
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
