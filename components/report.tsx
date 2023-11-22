import React, { useEffect, useState, MouseEvent } from 'react'
import { FormIndex, SocialLogin } from '@/components/login'
import { Modal } from '@/components'
type ReportProps = {
  openModel: boolean
  handleOpen?: any
}

export function Report({ openModel, handleOpen }: ReportProps) {
  const [isRegisterForm, setIsRegisterForm] = useState(false)
  return (
    <>
      <Modal
        isOpen={openModel}
        button={false}
        setIsOpen={(value: boolean, e:MouseEvent<HTMLButtonElement,MouseEvent>) => {
          handleOpen(value,e)
        }}
        modelSize={'sm'}
        borderTop={false}>
        <div className='w-full p-2 overflow-hidden'>
          <div className='mt-4 flex items-center justify-between'>
            <span className='border-b w-1/5 lg:w-1/4'></span>
            <a className='text-xs text-center text-gray-500 uppercase'>
              {isRegisterForm ? 'register with email' : 'login with email'}
            </a>
            <span className='border-b w-1/5 lg:w-1/4'></span>
          </div>
       
            <FormIndex
              loginSuccess={(value: any) => handleOpen(value ? false : true)}
            />
    
          <div className='mt-4 flex items-center justify-between'>
            <span className='border-b w-1/5 lg:w-1/4'></span>
            <a className='text-xs text-center text-gray-500 uppercase'>
              {isRegisterForm
                ? 'register with social account'
                : 'login with social account'}
            </a>
            <span className='border-b w-1/5 lg:w-1/4'></span>
          </div>
        </div>
      </Modal>
    </>
  )
}
