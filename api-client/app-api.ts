import axiosConfig from '@/api-client/axios-config'
export const appApi = {
  uploadImage(file: any) {
    return axiosConfig.post('/upload-image',{
      data:file
    })
  },
  bookmarkList(){
    return axiosConfig.get('/my-bookmarks')
  },
  getNotify(){
    return axiosConfig.get('/notifications')
  },
  sendNotify(id:number){
    return axiosConfig.get(`${id}/send-notification`)
  },
  search(keyword:string,type:string, limit:number){
    return axiosConfig.get(`/search?q=${keyword}&type=${type}&limit=${limit}`)
  }
}
