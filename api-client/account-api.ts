import axios from "axios"
import axiosConfig from '@/api-client/axios-config'
export const accountApi = {
     githubInfo(github_username:string){
          return axios.get(`https://api.github.com/users/${github_username}`)
     },
     myProfile(){
          return axiosConfig.get('/my/profile')
     },
     userProfile(username:String){
          return axiosConfig.get(`/user/${username}/info`)
     },
     profileUpdate(data:any){
          let dataSend:any = JSON.stringify({
               imageUrl:data?.imageUrl,
               name:data?.name,
               bio:data?.bio,
               username:data?.username,
               skill:data?.skill,
               github_username:data?.github_username,
               web_url:data?.web_url,
               education:data?.education,
               email_display:data?.email_display
          })
          return axiosConfig.post('/me/update-profile',dataSend)
     }
}