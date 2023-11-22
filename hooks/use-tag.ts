import { commentApi } from '../api-client/comment-api'
import { postApi, tagApi } from '@/api-client'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'

export function useTagsFollow(option?: Partial<PublicConfiguration>) {
  const {
    data: tagsFollowing,
    error,
    mutate,
  }: any = useSWR(`/my/tags-following`, {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    revalidateOnMount:false,
    ...option
  })
  const fistLoading = tagsFollowing === undefined && error === undefined

  async function followTag(id: number) {
   let data =  await tagApi.followTag(id)
    await mutate(tagsFollowing)
    return data;
  }

 
  return {
    followTag,
    tagsFollowing,
    fistLoading,
    error,
    mutate,
  }
}
