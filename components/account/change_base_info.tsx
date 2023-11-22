import { accountApi } from '@/api-client/account-api'
import { useAuth } from '@/hooks'
import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export function ChangeBaseInfo() {
  const { profile, mutate} = useAuth()
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
     defaultValues:{
          imageUrl:profile?.avatar,
          name:profile?.name,
          email:profile?.email,
          github_username:profile?.github_username,
          username:profile?.username,
          bio:profile?.bio,
          skill:profile?.skill,
          web_url:profile?.web_url,
          education:profile?.education,
          email_display:profile?.email_display
     }
  })
  const onSubmit = async(data: any) => {
     setLoading(true)
     await accountApi.profileUpdate(data).then((res:any)=>{
          mutate(res)
          setLoading(false);
          toast.success("Thay đổi thông tin thành công")
     }).catch(()=>{
      setLoading(false)
      toast.error('User name đã được sử dụng')
     })
  }
  
  return (
    <>
      <div className='p-6  bg-white w-full mb-4 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
        <h2 className='text-lg font-bold mb-3'>Thông tin cá nhân</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Avatar
            </label>
            <div className='flex items-center'>
              <img
                className=' w-16 h-16 rounded-full mr-2'
                src={profile?.avatar}
              />
              <input
                type='file'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              />
              <input
              type='text'
              {...register('imageUrl')}
              hidden
              />
            </div>
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Tên hiển thị
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('name')}
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Email
            </label>
            <input
              disabled
              type='email'
              {...register('email')}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email_display'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Email hiển thị
            </label>
            <input
              type='email'
              {...register('email_display')}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Username
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('username')}
            />
          </div>
          {/* <div className='mb-6'>
            <label
              htmlFor='github_username'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Github username
            </label>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...register('github_username')}
            />
          </div> */}
          <div className='mb-6'>
            <label
              htmlFor='web_url'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Website
            </label>
            <input
              type='url'
              {...register('web_url')}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          
            />
          </div>
          {/* <div className='mb-6'>
            <label
              htmlFor='education'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Bạn đang học trường nào?
            </label>
            <input
              type='education'
              {...register('education')}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          
            />
          </div> */}
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Giới thiệu
            </label>
            <textarea
              rows={3}
              {...register('bio')}
              className='w-full rounded-md border p-3 bg-gray-50'></textarea>
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
              Liên Kết
            </label>
            <textarea
              rows={3}
              {...register('skill')}
              placeholder='Ví dụ: Facebook, Instagram, TikTok,...'
              className='w-full rounded-md border p-3 bg-gray-50'></textarea>
          </div>
          <div className='flex justify-end'>
            <button type='submit' disabled={loading} className='py-2 px-10 text-white bg-indigo-600 rounded-md hover:bg-indigo-500'>
              {loading?('Đang lưu'):('Lưu lại')}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
