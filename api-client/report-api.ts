import axiosConfig from '@/api-client/axios-config'

export const reportApi = {
  reportPost(id:number,content:string){
    return axiosConfig.post(`/post/${id}/comment`,{content:content})
  },

}
