import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  FormEventHandler,
} from 'react'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import SEO from '@bradgarropy/next-seo'
import { useRouter } from 'next/router'
import Multiselect from 'multiselect-react-dropdown'
import { useHotkeys } from 'react-hotkeys-hook'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import { postApi } from '@/api-client'
import { BlankLayout } from '@/components/layouts'
import { NextPageWithLayout, PostModel, PostNewModel, TagModel } from '@/models'
import { Modal, EditorMarkdown } from '@/components'
import TextareaAutosize from 'react-textarea-autosize'
import { Loader } from '@/components/layouts/common'
import _ from 'lodash'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
})
const styleMultiSelect = {
  chips: {
    background: 'white',
    border: '1px solid #e3e3e3',
    color: 'black',
  },
  multiselectContainer: {
    color: 'black',
  },
  searchBox: {
    border: 'none',
  },
  inputField: {
    border: 'none',
    outline: 'none',
  },
  optionContainer: {
    // To change css for option container
    // border: '1px solid #e3e3e3',
    boxShadow: '#e3e3e3 0px 10px 15px -3px',
  },
  option: {
    // border: '1px solid #e3e3e3',
    borderRadius: '5px',
  },
}
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
type PageProps = {}

const NewPost: NextPageWithLayout = (props: PageProps) => {
  const { data: tags } = useSWR<Array<TagModel>>('/tags', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
  })
  const router = useRouter()
  const autosavedValue = localStorage?.getItem(`editor-save`) || ''
  const [modalOpen, setModalOpen] = useState(false)
  const [preview, setPreview] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadWhenSuccess, setLoadWhenSuccess] = useState(false)
  //data
  const [title, setTitle] = useState('')
  const [content, setContent] = useState<any>()
  const [tagsSelected, setTagsSelected] = useState<Array<TagModel>>([])
  //error
  const [titleError, setTitleError] = useState('')
  const [tagError, setTagError] = useState('')
  const [contentError, setContentError] = useState('')
  const [error, setError] = useState(false)
  const handelButtonModal = () => {
    return router.push('/')
  }
  useEffect(() => {
    let dataAutoSave: any = autosavedValue && JSON?.parse(autosavedValue)
    setTitle(dataAutoSave?.title)
    setContent(dataAutoSave?.contentMarkdown)
    setTagsSelected(dataAutoSave?.tags)
  }, [autosavedValue])
  function auto_grow(element: any) {
    element.style.height = '5px'
    element.style.height = element.scrollHeight + 'px'
  }
  const onChange = useCallback(
    (value: any) => {
      setContent(value)
      setError(false)
      let editorSave = JSON?.stringify({
        title: title,
        tags: tagsSelected,
        contentMarkdown: value,
      })
      localStorage.setItem('editor-save', editorSave)
    },
    [tagsSelected, title]
  )

  useHotkeys('ctrl+alt+up', () => {
    setPreview(true)
  })
  useHotkeys('ctrl+alt+down', () => {
    setPreview(false)
  })
  const handleNewPost = async () => {
    if (title == '' || title == null) {
      setTitleError('Tiêu đề không được để trống!')
      setError(true)
      return
    }
    if (tagsSelected.length <= 0) {
      alert('vui long chon tag')
      return
    }
    if (content == '' || content == null) {
      setContentError('Vui lòng nhập nội dung')
      setError(true)
      return
    }
    setLoading(true)
    let dataCreateNewPost: PostNewModel = {
      title: title,
      tags: tagsSelected,
      content: content,
    }
    const result: any = await postApi.createNewPost(dataCreateNewPost)
    if (result) {
      setLoading(false)
      setLoadWhenSuccess(true)
      setTitle('')
      localStorage.setItem('editor-save', '')
      router.push(`/bai-dang/${result?.slug}`)
    }
  }

  const filerIfExits = (value: string) => {
    if (tagsSelected.filter((e: any) => e.slug === value).length > 0) {
      return true
    }
    return false
  }
  if (loadWhenSuccess) return <Loader />
  return (
    <>
      <SEO title='Thêm mới bài viết' description='Thêm mới bài viết' />
      <div
        id='myText'
        className='bg-gray-primary dark:bg-slate-900 min-h-screen'>
        <Disclosure as='nav'>
          {({ open }) => (
            <>
              <div className='max-w-7xl mx-auto  sm:px-6 lg:px-8'>
                <div className='relative flex items-center justify-between h-16'>
                  <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                    <div className='flex-shrink-0 flex items-center'>
                      {/* <img
                                                  className="block lg:hidden h-8 w-auto"
                                                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                                  alt="Workflow"
                                              /> */}
                      {/* <img
                          className='hidden lg:block h-8 w-auto'
                          src='https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg'
                          alt='Workflow'
                        /> */}
                    </div>
                  </div>
                  <div className='absolute inset-y-0 right-0 flex items-center px-5 md:px-0 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                    <button
                      onClick={() =>
                        preview ? setPreview(false) : setPreview(true)
                      }
                      type='button'
                      className='text-gray-500 mr-4 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                      data-modal-toggle='defaultModal'>
                      {!preview ? 'Xem Trước Bài Đăng' : 'Quay Lại'}
                    </button>
                    <button
                      onClick={() => {
                        if (content || title || tagsSelected?.length > 0) {
                          setModalOpen(true)
                        } else {
                          router.push('/')
                        }
                      }}
                      type='button'
                      className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                      data-modal-toggle='defaultModal'>
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
                    <Modal
                      isOpen={modalOpen}
                      setIsOpen={() => setModalOpen(false)}>
                      <div className='py-2 dark:text-gray-50'>
                        Bạn đang có nội dung chưa được đăng tải, bạn có muốn
                        thoát không?
                      </div>
                      <div className='w-full flex justify-end'>
                        <button
                          onClick={() => handelButtonModal()}
                          className=' w-24 py-2 mt-3 bg-gray-300 hover:bg-gray-200 rounded-md text-gray-700 mr-2'>
                          Vâng
                        </button>
                        <button
                          onClick={() => setModalOpen(false)}
                          className=' w-24 py-2 mt-3 bg-indigo-600 hover:bg-indigo-500 rounded-md text-gray-50'>
                          Không
                        </button>
                      </div>
                    </Modal>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
        <div className='md:max-w-6xl w-full m-auto flex justify-start md:pb-32 md:px-0'>
          {!preview ? (
            <div className='md:w-3/4 w-full'>
              <div className='w-full rounded-t-2xl md:rounded-2xl border-2 border-gray-300 bg-white dark:bg-slate-600 h-full  px-2 md:px-6'>
                {error && (
                  <div className='w-full px-2 bg-red-300 py-4 mt-3 border border-red-700'>
                    <ul className=' list-disc ml-5'>
                      {tagError && <li>{tagError}</li>}
                      {titleError && <li>{titleError}</li>}
                      {contentError && <li>{contentError}</li>}
                    </ul>
                  </div>
                )}
                <div className='py-5'>
                  <TextareaAutosize
                    onChange={(value) => {
                      setTitleError('')
                      setError(false)
                      setTitle(value.target.value)
                    }}
                    placeholder='Nhập Tiêu Đề '
                    value={title}
                    className='w-full bg-transparent h-20 text-2xl md:text-4xl font-bold p outline-none textarea-auto-resize'
                  />
                  {/* <input
                    autoFocus
                    onChange={(value) => {
                      setTitleError('')
                      setError(false)
                      setTitle(value.target.value)
                    }}
                    
                    value={title}
                    className={classNames(
                      'w-full bg-transparent h-20 text-2xl md:text-4xl font-bold p outline-none'
                    )}
                    placeholder='Nhập Tiêu Đề.'
                  /> */}
                  <div className='h-30 my-3 w-full'>
                    <div className='Multiselect'>
                      <Multiselect
                        customCloseIcon={
                          <XMarkIcon className='h-4 w-4 cursor-pointer ml-2 hover:text-red-400  text-gray-800' />
                        }
                        selectedValues={tagsSelected}
                        onSelect={(selectedList: any) => {
                          setTagsSelected(selectedList)
                          setError(false)
                          setTagError('')
                        }}
                        onRemove={(removeItem: any) => {
                          setTagsSelected(removeItem)
                        }}
                        loading={tags == undefined}
                        selectionLimit={4}
                        style={styleMultiSelect}
                        closeIcon='close'
                        options={_.orderBy(tags,(it) => it?.important)}
                        placeholder='Chọn tối đa 4 cộng đồng...'
                        displayValue='name' // Property name to display in the dropdown options
                      />
                    </div>
                  </div>
                  <EditorMarkdown
                    value={content}
                    onChange={onChange}
                    Option={{
                      minHeight: '200px',
                      maxHeight: '400px',
                    }}
                  />
                </div>
              </div>
              <div className='flex justify-end items-center'>
                {loading && (
                  <div role='status mr-3'>
                    <svg
                      className='inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
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
                )}

                <button
                  disabled={loading}
                  onClick={() => handleNewPost()}
                  className=' px-8 py-2 rounded-md ml-3 bg-indigo-500 mt-2 text-gray-200'>
                  {loading ? 'Đang tải lên' : 'Đăng tải'}
                </button>
              </div>
            </div>
          ) : (
            <div className=' md:w-3/4 w-full min-h-[70vh] rounded-2xl border-2 border-gray-300 dark:bg-slate-600 bg-white py-5 px-6'>
              <div className='w-full border-b py-3 border-gray-50'>
                <h1 className='text-4xl dark:text-gray-50 font-[500]  mb-3 mt-2'>
                  {title}
                </h1>
                <div className='flex flex-wrap justify-starts items-center mt-4'>
                  {tagsSelected?.map((item: any) => (
                    <div
                      key={item?.id}
                      className='text-sm mr-2 py-1 px-1.5 text-gray-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-md'>
                      {item?.name}
                    </div>
                  ))}
                </div>
                {/* <ul className='mt-2 flex'>
                    <li className='mx-2'>
                      Hỏi bởi: <a className='#'>đức nv</a>
                    </li>
                    <li className='mx-2'>Th2, 27/2022</li>
                    <li className='mx-2'>Lượt xem: 20</li>
                  </ul> */}
              </div>
              <div className='flex  py-3'>
                <div className='w-11/12 dark:text-gray-800 px-2 pb-12'>
                  <span className='text-xs text-gray-400 dark:text-gray-200'>
                    Nội dung :
                  </span>
                  <div className='post-details'>
                    <MarkdownPreview source={content} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
NewPost.Layout = BlankLayout
NewPost.requestAuth = true
export default NewPost
