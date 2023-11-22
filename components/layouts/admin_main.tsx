// import React, { useEffect, useState, MouseEvent } from 'react'
// import { useRouter } from 'next/router'
// import Head from 'next/head'
// import { LayoutProps } from '@/models'
// import {

//   Loader,
//   Admin_Navbar,
//  SidebarLeft,
//   Totop,
// } from '@/components/layouts/common'

// import { useAuth } from '@/hooks'
// import { LoginModal } from '../login/login_modal'
// function classNames(...classes: any) {
//   return classes.filter(Boolean).join(' ')
// }
// export function AdminMainLayout({
//   sidebarLeft,
//   requestAuth,
// }: LayoutProps) {
//   const router = useRouter()
//   const { profile, fistLoading } = useAuth({})
//   const [isRequestAuth, setItRequestAuth] = useState(false)
//   useEffect((): any => {
//     if (requestAuth) {
//       if (!profile?.name && !fistLoading) {
//         setItRequestAuth(true)
//       } else {
//         setItRequestAuth(false)
//       }
//     }
//   }, [router, profile, requestAuth, fistLoading])
//   return (
//     <div className=' bg-gray-100 dark:bg-black pt-16'>
//       <Admin_Navbar />
//       <LoginModal
//         openModel={isRequestAuth}
//         handleOpen={(
//           value: boolean,
//           e: MouseEvent<HTMLButtonElement, MouseEvent>
//         ) => {
//           e.preventDefault()
//           setItRequestAuth(value)
//           router.push('/')
//         }}
//       />
//       {!profile?.name && requestAuth ? (
//         <Loader />
//       ) : (
//         <>
//           <div className='flex-grow relative w-full min-h-screen md:max-w-[90rem] lg:max-w-[100rem]	mx-auto lg:flex'>
//             {sidebarLeft && (
//               <div className='relative min-h-screen pr-5 hidden lg:block xl:flex-shrink-0 xl:w-80 0'>     
//                 <SidebarLeft />
//               </div>
//             )}

//           </div>
//         </>
//       )}
//       <Totop />

//     </div>
//   )
// }
