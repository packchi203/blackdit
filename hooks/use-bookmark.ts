import { commentApi } from './../api-client/comment-api'
import { postApi } from '@/api-client'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'

export function useBookmarks(option?: Partial<PublicConfiguration>) {
  const {
    data: bookmarks,
    error,
    mutate,
  }: any = useSWR('/my-bookmarks', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...option,
  })
  const fistLoading = bookmarks === undefined && error === undefined

  async function bookmarkPost(id: number) {
   let data =  await postApi.bookmarkPost(id)
    await mutate(bookmarks)
    return data;
  }

  async function bookmarkComment(id: number) {
    let data = await commentApi.bookmarkAnswer(id)
    await mutate(bookmarks)
    return data;
  }

  return {
    bookmarkPost,
    bookmarkComment,
    fistLoading,
    bookmarks,
    error,
    mutate,
  }
}
