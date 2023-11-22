import axiosConfig from '@/api-client/axios-config'

export const commentApi = {
  replyPost(id:number,content:string){
    return axiosConfig.post(`/post/${id}/comment`,{content:content})
  },
  replyComment(id:number,content:string,reply_to:{id:number}){
    return axiosConfig.post(`/post/${id}/comment`,{content:content,reply_to:reply_to})
  },
  bookmarkAnswer(id: number) {
    return axiosConfig.post(`/comment/${id}/bookmark`)
  },
  findCommentByPost(id:number){
    return axiosConfig.get(`/post/${id}/comments`)
  },
  voteComment(id:number,type:number){
    return axiosConfig.post(`/comment/${id}/vote`,{type:type})
  },
  async myComments(){
    return axiosConfig.get('/my/comments')
  },
  async userComments(username:string){
    return axiosConfig.get(`/user/${username}/comments`)
  }
}
