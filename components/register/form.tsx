import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

import { authApi } from '@/api-client'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
type FormRegisterProps = {
  registerStatus: any
}
type DataRegisterProps = {
  name: string
  email: string
}
export function FormRegister({ registerStatus }: FormRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataRegisterProps>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  let avatar = `<svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" ><title>Maud Nathan</title><mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#mask__beam)"><rect width="36" height="36" fill="#96b5a6"></rect><rect x="0" y="0" width="36" height="36" transform="translate(-3 7) rotate(87 18 18) scale(1)" fill="#febeac" rx="36"></rect><g transform="translate(-7 3.5) rotate(-7 18 18)"><path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path><rect x="12" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="22" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>`
  const handleRegister: SubmitHandler<DataRegisterProps> = async ({
    name,
    email,
  }) => {
    setLoading(true);
    try {
      await authApi.register({ avatar, name, email });
      setLoading(false);
      registerStatus(true);
      toast('Bạn đã đăng ký tài khoản thành công!', {
        icon: '👏',
      });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast('Tài khoản đã tồn tại. Vui lòng sử dụng địa chỉ email khác.', {
          icon: '❌',
        });
      } else {
        console.log(err);
        toast('Đã xảy ra lỗi khi đăng ký tài khoản.', {
          icon: '❌',
        });
      }
      registerStatus(false);
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className='mt-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Tên hiển thị
          </label>
          <input
            {...register('name', { required: true })}
            className='bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none'
            type='text'
          />
        </div>
        <div className='mt-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Địa chỉ email
          </label>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className='bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none'
            type='email'
          />
        </div>
        <div className='mt-8'>
          <button
            type='submit'
            disabled={loading}
            className={classNames(
              'bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600',
              loading && 'bg-gray-500'
            )}>
            {loading ? (
              <div
                role='status'
                className='w-full flex justify-center items-center text-center'>
                <svg
                  className='mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
              </div>
            ) : (
              <>Đăng ký</>
            )}
          </button>
        </div>
      </form>
    </>
  )
}
