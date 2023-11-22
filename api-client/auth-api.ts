import { LoginModelProps, GetOtpModelProps } from '@/models'
import { RegisterModelProps } from '@/models'
import axiosConfig from '@/api-client/axios-config'

export const authApi = {
  register({ avatar, name, email }: RegisterModelProps) {
    let dataSend = JSON.stringify({
      avatar: avatar,
      name: name,
      email: email,
    })
    return axiosConfig.post('/register', dataSend)
  },
  getOTP({ email }: GetOtpModelProps) {
    let dataSend = JSON.stringify({
      email: email,
    })
    return axiosConfig.post<any>('/login/get-otp', dataSend)
  },
  login({ email, password }: LoginModelProps) {
    let dataSend = JSON.stringify({
      email: email,
      password: password,
    })
    return axiosConfig.post('/login/email-login', dataSend)
  },
  logout() {
    return axiosConfig.post('/logout')
  },
}
