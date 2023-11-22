import React, { useState } from 'react'
import { Fragment } from 'react'
import { Transition, Dialog, Tab } from '@headlessui/react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
type ModalProps = {
  isOpen: boolean
  setIsOpen?: any
  modelSize?: string
  borderTop?: boolean
  title?: string
  buttonTitle?: string
  button?: boolean
  modalCloseTittle?: boolean
  children: any
  handelButtonModal?: any
}
export function Modal(props: ModalProps) {
  let size =
    props.modelSize == 'sm'
      ? 'max-w-xl'
      : props.modelSize == 'lg'
      ? 'max-w-2xl'
      : props.modelSize == 'xl'
      ? 'max-w-3xl'
      : 'max-w-lg'
  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-50 bg-blend-hue overflow-y-auto'
          onClose={() => props.setIsOpen(false)}>
          <div className='min-h-screen px-4 text-center bg-black bg-opacity-40 '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed' />
            </Transition.Child>
            <span
              className='inline-block  h-screen align-top'
              aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <div
                className={classNames(
                  'inline-block w-full p-6 my-28 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-900 shadow-xl rounded-2xl',
                  size
                )}>
               
                <div className='flex justify-between items-start rounded-t '>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium text-gray-900'>
                  {props.title}
                </Dialog.Title>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      props.setIsOpen(false,e)
                    }}
                    type='button'
                    className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'>
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'></path>
                    </svg>
                  </button>
                </div>
                {props.borderTop ?? <div className='border-b-2 mt-2' />}
                <div className='w-full'>{props.children}</div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
