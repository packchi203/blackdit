import axiosConfig from '@/api-client/axios-config'
export const tagApi = {
    async getAll(){
          return axiosConfig.get('/tags')
     },
     async followTag(id:number){
          return axiosConfig.post('/tag/follow',{tag:{id:id}})
     },
     async tagDetails (slug:string){
          return axiosConfig.get(`/tag/${slug}/details`)
     },
     async filterPostsByTag(slug:string,sort:string,page:number){
          return axiosConfig.get(`/filter/${slug}/posts-by-tag?sort=${sort}&page=${page}&size=10`);
     }
}