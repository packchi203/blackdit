import React from 'react'
import {useRouter} from 'next/router'
import Cookies from 'js-cookie'
import { GOOGLE_AUTH_URL, GITHUB_AUTH_URL,FACEBOOK_AUTH_URL} from '@/constants';

type Props = {}

export function SocialLogin({}: Props) {
  const {push, asPath} = useRouter();
  const loginWithGoogle = (e:any) =>{
    e.preventDefault();
    push(GOOGLE_AUTH_URL)
    Cookies.set('path-to-back',asPath)
  }
  const loginWithGithub = (e:any) =>{
    e.preventDefault();
    push(GITHUB_AUTH_URL)
    Cookies.set('path-to-back',asPath)
  }
  const loginWithFacebook = (e: any) => {
    e.preventDefault();
    push(FACEBOOK_AUTH_URL); // Sử dụng URL đăng nhập của Facebook
    Cookies.set('path-to-back', asPath);
  };

  return (
    <>
      <div className='flex'>
      <div className='w-1/3 ml-1'>
          <a
            href='#'
            onClick={loginWithFacebook}
            className='flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover-bg-gray-100'>
            <div className='py-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                viewBox='0 0 36 36'>
                <path
                  d='M36 0.25C36 0.111 35.889 0 35.75 0H0.25C0.111 0 0 0.111 0 0.25V35.75C0 35.889 0.111 36 0.25 36H18V22H13.5V16H18V12.25C18 7.186 21.251 5 25.376 5 27.399 5 29.75 5.562 29.75 5.562 29.75 5.562 29.562 4 27.813 4 25.937 4 24.5 5.25 24.5 5.25 24.5 5.25 24.625 9 24.625 12.25H18.001L18 16H24.625L24.187 22H18V36H35.75C35.889 36 36 35.889 36 35.75V0.25Z'
                  fill='#1976D2'
                />
              </svg>
            </div>
          </a>
        </div>
        <div className='w-1/2 mr-1'>
          <a
            href='#'
            onClick={loginWithGoogle}
            className='flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100'>

            <div className='py-3'>
              <svg className='h-6 w-6' viewBox='0 0 40 40'>
                <path
                  d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                  fill='#FFC107'
                />
                <path
                  d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
                  fill='#FF3D00'
                />
                <path
                  d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
                  fill='#4CAF50'
                />
                <path
                  d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                  fill='#1976D2'
                />
              </svg>
            </div>
          </a>
        </div>
        <div className='w-1/2 ml-1'>
          <a
            href='#'
            onClick={loginWithGithub}
            className='flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100'>
            <div className='py-3'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                viewBox='0 0 32 32'>
                <path d='M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z' />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}
