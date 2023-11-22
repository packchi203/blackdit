import React, { useState } from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/outline'
export function Totop() {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', toggleVisible)
  }
  return (
    <>
      {visible ? (
        <button
          onClick={scrollToTop}
          className='fixed shadow-sm border border-gray-300 bottom-16 md:bottom-36 hover:bg-indigo-500 hover:text-white right-12 p-2'>
          <ArrowUpIcon className='h-6 w-6' aria-hidden='true' />
        </button>
      ) : (
        ''
      )}
    </>
  )
}
