import React, { useEffect, useState, MouseEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BlankLayout } from '@/components/layouts'
import { FormIndex, SocialLogin } from '@/components/login'
import { NextPageWithLayout } from '@/models'
import { Modal } from '@/components'
import { FormRegister } from '../register'

type LoginModalProps = {
  openModel: boolean
  handleOpen?: any
}

export function LoginModal({ openModel, handleOpen }: LoginModalProps) {
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
          {isRegisterForm ? (
            <FormRegister
              registerStatus={(value: boolean) => setIsRegisterForm(!value)}
            />
          ) : (
            <FormIndex
              loginSuccess={(value: any) => handleOpen(value ? false : true)}
            />
          )}
          <div className='mt-4 flex items-center justify-between'>
            <span className='border-b w-1/5 lg:w-1/4'></span>
            <a className='text-xs text-center text-gray-500 uppercase'>
              {isRegisterForm
                ? 'register with social account'
                : 'login with social account'}
            </a>
            <span className='border-b w-1/5 lg:w-1/4'></span>
          </div>
          <SocialLogin />
          <div className='mt-4 flex items-center justify-between'>
            <span className='border-b w-1/5 md:w-1/4'></span>
            <a href='#' className='text-xs text-gray-500 uppercase'>
              {isRegisterForm ? 'or sign up' : 'or login'}
            </a>
            <span className='border-b w-1/5 md:w-1/4'></span>
          </div>
          <div className='text-center'>
            {isRegisterForm ? (
              <span className='text-sm cursor-pointer'>
                Bạn đã có tài khoản?{' '}
                <a
                  onClick={() => setIsRegisterForm(false)}
                  className='text-red-500'>
                  Đăng nhập
                </a>
              </span>
            ) : (
              <span className='text-sm cursor-pointer'>
                Bạn chưa có tài khoản?{' '}
                <a
                  onClick={() => setIsRegisterForm(true)}
                  className='text-red-500'>
                  Đăng ký
                </a>
              </span>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
