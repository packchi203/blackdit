import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { MainLayout } from '@/components/layouts'
import { tagApi } from '@/api-client'
import _ from 'lodash'
import SEO from "@bradgarropy/next-seo"
import { TagItem } from '@/components'

type Props = {}
const Tags = (props: Props) => {
  const [tags, setTags] = useState([])
  const [tagsFilter,setTagFilter] = useState([])
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    await tagApi.getAll().then((res: any) => {
      setTags(res)
      setTagFilter(res)
      setLoader(false)
    })
  }
  function searchByTextInput(text:any) {
    let data:any =  _.filter(tags, _.flow(
      _.partial(_.omit, _, 'name'),
      _.partial(
        _.some, _,
        _.flow(_.toLower, _.partial(_.includes, _, _.toLower(text), 0))
      )
    ));
    setTagFilter(data)
  }
  const renderTags = () => {
    if (loader) {
      return (
        <>
          {Array.from(Array(12), (e, i) => {
            return (
              <>
                <div key={i} className='border bg-gray-50 rounded-md p-3'>
                  <div className='animate-pulse  bg-gray-300 w-12 mb-2 rounded-md h-4' />
                  <div className='animate-pulse mb-2  bg-gray-300 w-full rounded-md h-12' />
                  <div className='flex mb-2 justify-between'>
                    <div className='animate-pulse  bg-gray-300 w-1/3 rounded-md h-4' />
                    <div className='animate-pulse  bg-gray-300 w-1/3 rounded-md h-4' />
                  </div>
                </div>
              </>
            )
          })}
        </>
      )
    }
    return _.map(tagsFilter, (item: any) => (
        <TagItem
          id={item?.id}
          key={item?.id}
          name={item?.name}
          slug={item?.slug}
          icon={item?.icon}
          color_bg={item?.color_bg}
          description={item?.desc}
          follow={item?.follow}
          posts_use={item?.posts_use}
          bg_color={item?.color_bg}
          tag_follow_count={item?.tag_follow_count}
        />
    ))
  }
  return (
    <>
    <SEO
    title='Danh sách tags'
    description='Danh sách tags'
    />
    <div>
      <div className='p-5 min-h-[90vh]'>
        <div className='w-3/12 relative rounded-md shadow-sm mb-6'>
          <input
           onChange={(value:any)=>searchByTextInput(value.target.value)}
            type='text'
            name='price'
            id='price'
            className='border cursor-pointer py-2 block w-full pl-3 pr-44 font-medium sm:text-sm text-gray-500 border-gray-300 rounded-md outline-none'
            placeholder={'Tìm kiếm...'}
          />
          <div className='absolute inset-y-0 right-0 flex items-center'>
            <button disabled={true} className='p-3'>
              <MagnifyingGlassIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-y-3 sm:grid-cols-1 gap-x-3 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-3'>
          {renderTags()}
        </div>
      </div>
    </div>
    </>
    
  )
}
Tags.Layout = MainLayout
Tags.sidebarRight = false
Tags.SidebarLeft = true
Tags.requestAuth = false
export default Tags
