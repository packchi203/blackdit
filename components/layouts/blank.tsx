import React, { useEffect, useState, MouseEvent } from 'react'
import { useRouter } from 'next/router'

import { Loader } from '@/components/layouts/common'
import { LayoutProps } from '@/models'
import { useAuth } from '@/hooks'
import { LoginModal } from '@/components/login'

export function BlankLayout({ children, requestAuth }: LayoutProps) {
  const router = useRouter()
  const { profile, fistLoading } = useAuth({})
  const [isRequestAuth, setItRequestAuth] = useState(false)
  useEffect((): any => {
    if (requestAuth) {
      if (!profile?.name && !fistLoading) {
        setItRequestAuth(true)
      } else {
        setItRequestAuth(false)
      }
    }
  }, [router, profile, requestAuth, fistLoading])
  return (
    <>
      <LoginModal
        openModel={isRequestAuth}
        handleOpen={(
          value: boolean,
          e: MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
          e.preventDefault()
          setItRequestAuth(value)
          router.push('/')
        }}
      />
      {!profile?.name && requestAuth ? (
        <Loader />
      ) : (
        <div className='bg-gray-200 w-full'>{children}</div>
      )}
    </>
  )
}
