import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ShareIcon } from '@heroicons/react/24/outline'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
export function ShareButton(props: any) {
  return (
    <>
      <Menu as='div' className='relative'>
        <div>
          <Menu.Button>
            <span className='sr-only'>Open user menu</span>
            <ShareIcon className='w-6 h-6' />
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
          <Menu.Items className='origin-top-rightt absolute right-0 mt-2  w-48 rounded-md shadow-lg p-2 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <Menu.Item>
              {({ active }) => (
                <a
                  href={`https://www.facebook.com/sharer.php?u=${props.url}`}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700 rounded-md text-left'
                  )}>
                  Copy Link
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href={`https://www.facebook.com/sharer.php?u=${props.url}`}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700 rounded-md text-left'
                  )}>
                  Chia sẻ Facebook
                </a>
              )}
            </Menu.Item>          
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
