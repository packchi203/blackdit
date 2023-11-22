import React, { useEffect, useState, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { LayoutProps } from '@/models'
import {
  Footer,
  Loader,
  Admin_Navbar,
  AdminSidebarLeft,
  Totop,
} from '@/components/layouts/common'

import { useAuth } from '@/hooks'
type Profile = {
  name?: string
  role?: string
  email?: string
}
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function AdminLayout({  children,
  sidebarLeft,
  sidebarRight,
  requestAuth,
 }: LayoutProps) {
  const router = useRouter()
  const [isRequestAuth, setItRequestAuth] = useState(false)
  const { profile, fistLoading } = useAuth()
  useEffect(() => {
    if (!fistLoading) {
      if (!profile || profile.role !== 'ADMIN') {
        if (router.pathname !== '/') {
          router.push('/');
        }
      } else {
        // if (router.pathname !== '/admin') {
        //   router.push('/admin');
        // }
      }
    }
  }, [router, profile, fistLoading]);
  if (!profile) return <p>Loading</p>
  return (
    <div className=' bg-gray-100 dark:bg-black pt-16'>
      <Admin_Navbar/>
    
      {!profile?.name && requestAuth ? (
        <Loader />
      ) : (
        <>
          <div className='flex-grow relative w-full min-h-screen md:max-w-[90rem] lg:max-w-[100rem]	mx-auto lg:flex'>
            {sidebarLeft && (
              <div className='relative min-h-screen pr-5 hidden lg:block xl:flex-shrink-0 xl:w-80 0'>     
                <AdminSidebarLeft />
              </div>
            )}

            <div className='flex container mx-auto'>
              <div
              className={classNames(sidebarRight?'w-full py-0 md:py-5 bg-landscape bg-gray-100 dark:dark:bg-slate-900 dark:md:bg-black':'w-full')}
                // className={ sidebarRight
                //     ? ''
                //     : ''}
                    
                    >
                {isRequestAuth && !profile ? (
                  <div className='h-screen'></div>
                ) : (
                  children
                )}
              </div>
            
            </div>
          </div>
        </>
      )}
      <Totop />
      <Footer />
    </div>
  )
}
