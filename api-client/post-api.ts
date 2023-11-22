import { getCookie } from 'cookies-next'
import { PostNewModel, PostModel } from '@/models'
import axiosConfig from '@/api-client/axios-config'
import Cookies from 'js-cookie'
const POST_PATH_API = '/posts'

export const postApi = {
  async getAllPostForStaticProps() {
    return await axiosConfig.get<Array<PostModel>>('/posts/list')
  },
  async getAllPost(byTags:string,sort: string, page: number,tags?:string) {
    return await axiosConfig.get<Array<PostModel>>(
      `/posts?by_tags=${byTags}&sort=${sort}&page=${page}&size=10${tags ?(`&tags=${tags}`):''}`
    )
  },
  async createNewPost(data: PostNewModel) {
    return await axiosConfig.post<PostModel>('/post/new', data)
  },
  async getDetails(slug: string) {
    return await axiosConfig
      .get<PostModel>(`/post/${slug}/details`)
      .then((res) => {
        return res
      })
  },
  async getDetailsStatic(slug: string) {
    return await axiosConfig
      .get<PostModel>(`/post/${slug}/static/details`)
      .then((res) => {
        return res
      })
  },
  async bookmarkPost(id: number) {
    return axiosConfig.post(`/post/${id}/bookmark`)
  },
  async votePost(id: number, type: number) {
    return axiosConfig.post(`/post/${id}/vote`, { type: type })
  },
  async myPosts() {
    return axiosConfig.get('/my/posts')
  },
  async userPosts(username: string) {
    return axiosConfig.get(`/user/${username}/posts`)
  },
  async postUpdate(id: number, data: PostNewModel) {
    return await axiosConfig
      .put<PostModel>(`/post/${id}/update`, data)
      .then((res) => {
        return res
      })
  },
  async deletePost(id:number){
    return await axiosConfig.delete<boolean>(`/post/${id}/delete`)
      .then((res) => {
        return res
      })
  }
}
