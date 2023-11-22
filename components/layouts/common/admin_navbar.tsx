import React, { useState, Fragment, useEffect } from 'react'
import Link from 'next/link'
import { useHotkeys } from 'react-hotkeys-hook'
import { useRouter } from 'next/router'
import { Disclosure, Menu, Transition, Switch } from '@headlessui/react'
import {
  BellIcon,
  PlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { useAuth } from '@/hooks'
import { SearchPopup } from '@/components/layouts/common'
import { LoginModal } from '@/components/login/login_modal'
import { appApi } from '@/api-client'
import _ from 'lodash'
type NavbarProps = {}
function classNames(...classes: any) {
  return classes.filter(Boolean).join('')
}
export function Admin_Navbar({}: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const currentTheme =
    typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light'
  const { profile, logout, fistLoading } = useAuth()
  const { asPath, events, push, reload } = useRouter()
  const [searchIsOpen, setSearchIsOpen] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hasNotify, setHasNotify] = useState(false)
  const [notifications, setNotification] = useState([])
  useEffect(() => {
    if (profile?.name) {
      fetchData()
    }
  }, [profile?.name, asPath == '/'])
  useEffect(() => {
    setTheme('light')
  }, [])
  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  const fetchData = async () => {
    await appApi.getNotify().then((res: any) => {
      setNotification(res)
      setLoading(false)
    })
  }
  let notifyNotSent: any = _.filter(notifications, { status: 'NOT_SEEN' })
  useEffect(() => {
    if (notifyNotSent.length > 0) {
      setHasNotify(true)
    }
  }, [notifications])
  const getChangerPopupSearch = (status: any) => {
    setSearchIsOpen(status)
  }
  const handleClickChangeTheme = () => {
    setTheme(theme === 'dark' ? 'dark' : 'dark')
  }
  useHotkeys('ctrl+alt+k', () => setSearchIsOpen(true))
  const menu = [
    { title: 'Dashboard', href: '/admin/', current: asPath === '/admin/' },
    // {
    //   title: 'Hỏi đáp',
    //   href: '/admin',
    //   current: asPath === '/tag/hoi-dap',
    // },
    // {
    //   title: 'Thảo luận',
    //   href: '/tag/thao-luan',
    //   current: asPath === '/tag/thao-luan',
    // },
    // {
    //   title: 'Bookmarks',
    //   href: '/bookmarks',
    //   current: asPath === '/bookmarks',
    // },
    // { title: 'Community', href: '/tags', current: asPath === '/tags' },
    // {
    //   title: 'Giới thiệu',
    //   href: '/gioi-thieu',
    //   current: asPath === '/gioi-thieu',
    // },
  ]
  const handleLogout = async () => {
    await logout()
    setOpenLoginModal(true)
  }

  const AccountInfo = () => {
    if (fistLoading) {
      return (
        <>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <div className='flex  animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div className=' flex-col space-y-3 hidden md:flex'>
                <div className='w-36 bg-gray-300 h-6 rounded-md '></div>
              </div>
              <div className='w-10 bg-gray-300 h-10 rounded-full mr-2 md:mr-0'></div>
            </div>
          </div>
        </>
      )
    }
    return (
      <>
        {!profile?.name && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <button
              onClick={() => setOpenLoginModal(true)}
              className='flex items-center px-4 py-2 border border-gray-300 dark:bg-blue-600 dark:border-0 dark:text-gray-100 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 outline-0 shadow-none'>
              <UserIcon
                className='h-5 w-5 text-gray-500 dark:text-gray-100'
                aria-hidden='true'
              />
              <span className='hidden md:block ml-2'>Đăng nhập / Đăng ký</span>
            </button>
          </div>
        )}
        {profile?.name && (
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <Link href={'/bai-dang/them-moi'}>
              <a className=' hidden md:inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-blue-600 dark:border-0 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                <PlusIcon
                  className='-ml-1 mr-2 h-5 w-5 text-gray-500 dark:text-gray-100'
                  aria-hidden='true'
                />
                Tạo bài đăng
              </a>
            </Link>
            <Link href={'/thong-bao'}>
              <a
                onClick={() => setHasNotify(false)}
                className='bg-white dark:bg-gray-800 relative p-1 ml-4 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white outline-none shadow-none'>
                {hasNotify && (
                  <div className='w-2 h-2 bg-blue-500 absolute  right-2 rounded-full' />
                )}
                <BellIcon className='h-6 w-6' aria-hidden='true' />
              </a>
            </Link>

            {/* Profile dropdown */}
            <Menu as='div' className='ml-3 relative z-50'>
              <div>
                <Menu.Button>
                  <div
                    className={
                      profile?.fpt_member &&
                      'rounded-full p-1  ring-2 ring-amber-400'
                    }>
                    {profile?.avatar ? (
                      <img
                        className='h-8 w-8 object-cover relative overflow-hidden rounded-full'
                        src={profile?.avatar}
                        alt={profile?.name}
                      />
                    ) : (
                      <div className='h-8 w-8 rounded-full flex justify-center items-center bg-yellow-600 text-white'>
                        {profile.name[0]}
                      </div>
                    )}
                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'>
                <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href={'/nguoi-dung/me'}>
                        <a
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}>
                          {profile?.name}
                          {profile?.fpt_member && (
                            <span
                              title='FPT MEMBER'
                              className='ml-1 text-[8px] px-[2px] py-[1px] bg-amber-200 text-yellow-800 rounded-md'>
                              FPTM
                            </span>
                          )}
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href={'/tai-khoan/cai-dat'}>
                        <a
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}>
                          Cài đặt
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link href={'/'}>
                        <a
                          onClick={(e) => {
                            e.preventDefault()
                            handleLogout()
                          }}
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text text-sm text-gray-700'
                          )}>
                          Đăng Xuất
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </>
    )
  }
  const [loadingWhenNextPage, setLoading] = useState(false)
  useEffect((): any => {
    const handleStart = (url: any) => url !== asPath && setLoading(true)
    const handleComplete = (url: any) =>
      url === asPath &&
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    events.on('routeChangeStart', handleStart)
    events.on('routeChangeComplete', handleComplete)
    events.on('routeChangeError', handleComplete)

    return () => {
      events.off('routeChangeStart', handleStart)
      events.off('routeChangeComplete', handleComplete)
      events.off('routeChangeError', handleComplete)
    }
  }, [asPath, events, loadingWhenNextPage])
  return (
    <>
      <Disclosure
        as='nav'
        className='top-0 z-30 w-full fixed text-xs lg:text-sm font-semibold lg:font-medium text-white border-b dark:border-slate-800 bg-gray-50 dark:bg-slate-900'>
        {({ open }) => (
          <>
            <div className='mx-auto w-full md:max-w-[90rem] lg:max-w-[100rem] px-2'>
              <div className='relative flex items-center justify-between h-16'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  {/* Mobile menu button*/}
                  <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                  <button className='p-3' onClick={() => setSearchIsOpen(true)}>
                    <MagnifyingGlassIcon
                      className='h-5 w-5 text-gray-800 ml-1'
                      aria-hidden='true'
                    />
                  </button>
                </div>
                <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                  <div className='flex-shrink-0 flex items-center'>
                    <Link href={'/'}>
                      <a>
                        <img
                          className=' h-8 w-auto'
                          src={
                            'https://res.cloudinary.com/dtwezwufx/image/upload/v1699015136/logo_ver2__cropped_nepf00.png'
                          }
                          alt='Workflow'
                        />
                      </a>
                    </Link>
                  </div>
                  <div className='hidden sm:block sm:ml-6'>
                    <div>
                      <div className='mt-1 relative rounded-md border'>
                        <div onClick={() => setSearchIsOpen(true)}>
                          <input
                            type='text'
                            name='price'
                            id='price'
                            disabled={true}
                            className='focus:ring-indigo-500 cursor-pointer  focus:border-indigo-500 block w-full pl-3 pr-44 py-2 font-medium sm:text-sm border-gray-300 rounded-md'
                            placeholder={'Tìm kiếm... (Ctrl + alt + k)'}
                          />
                        </div>

                        <div className='absolute inset-y-0 right-0 flex items-center text-gray-800'>
                          <button
                            className='p-3'
                            onClick={() => setSearchIsOpen(true)}>
                            <MagnifyingGlassIcon
                              className='h-5 w-5'
                              aria-hidden='true'
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className='hidden md:block'>
                  <Switch
                    checked={theme === 'dark' ? true : false}
                    onChange={handleClickChangeTheme}
                    className={`${
                      theme === 'dark' ? 'bg-gray-300' : 'bg-gray-200'
                    }
                                     relative inline-flex flex-shrink-0 h-[25px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                    <span className='sr-only'>Use setting</span>
                    <span
                      aria-hidden='true'
                      className={`${
                        theme === 'dark' ? 'translate-x-9' : 'translate-x-0'
                      }
                                        pointer-events-none inline-block h-[23px] w-[23px] justify-center items-center rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}>
                      {theme === 'dark' ? '🌜' : '🌞'}
                    </span>
                  </Switch>
                </div> */}

                <div className='flex'>{AccountInfo()}</div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='px-2 pt-2 pb-3 flex flex-col border-t'>
                {menu.map((item) => (
                  <Disclosure.Button
                    key={item.title}
                    as='a'
                    href={item.href}
                    className={classNames(
                      item.current
                      ? 'border-l-4 border-indigo-600 font-bold text-gray-700 dark:text-gray-100 bg-gray-200'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2  text-base font-medium w-full mb-2'
                    )}
                    aria-current={item.current ? 'page' : undefined}>
                    {item.title}
                  </Disclosure.Button>
                ))}
                <Disclosure.Button
                  as='a'
                  href={'/bai-dang/them-moi'}
                  className={classNames(
                    asPath == '/bai-dang/them-moi'
                      ? 'border-l-4 border-indigo-600 font-bold text-gray-700 dark:text-gray-100 bg-gray-200'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2  text-base font-medium w-full mb-2'
                  )}
                  aria-current={
                    asPath == '/bai-dang/them-moi' ? 'page' : undefined
                  }>
                  Thêm bài đăng
                </Disclosure.Button>
                {/* <div className='flex justify-end px-4 border-t pt-4'>
                  <Switch
                    checked={theme === 'dark' ? true : false}
                    onChange={handleClickChangeTheme}
                    className={`${
                      theme === 'dark' ? 'bg-gray-300' : 'bg-gray-200'
                    }
                                     relative inline-flex flex-shrink-0 h-[25px] w-[60px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}>
                    <span className='sr-only'>Use setting</span>
                    <span
                      aria-hidden='true'
                      className={`${
                        theme === 'dark' ? 'translate-x-9' : 'translate-x-0'
                      }
                                        pointer-events-none inline-block h-[23px] w-[23px] justify-center items-center rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}>
                      {theme === 'dark' ? '🌜' : '🌞'}
                    </span>
                  </Switch>
                </div> */}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <SearchPopup
        searchIsOpen={searchIsOpen}
        getChangerPopupSearch={getChangerPopupSearch}
      />
      <LoginModal
        openModel={openLoginModal}
        handleOpen={(value: boolean) => setOpenLoginModal(value)}
      />
      {/* {loadingWhenNextPage && (
        <div className='fixed top-24 left-1/2 p-3 rounded-full bg-gray-100 border z-50'>
          <svg
            aria-hidden='true'
            className=' w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
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
      )} */}
    </>
  )
}
