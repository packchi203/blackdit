import { ComponentProps, useState } from 'react'
import { useAuth } from '@/hooks'
import { LoginModal } from '@/components/login'

export function ComponentRequestAuth({children}: any) {
  const { profile } = useAuth()
  const [openLoginModal, setOpenLoginModal] = useState(false)
  return (
    <>
      <LoginModal
        openModel={openLoginModal}
        handleOpen={(value: boolean) => setOpenLoginModal(value)}
      />
      <div
      className='relative hover:cursor-pointer'
        onClick={(e) => {
          e.preventDefault();
          !profile?.name&&setOpenLoginModal(true)
        }}>
        {children}
      </div>
    </>
  )
}
