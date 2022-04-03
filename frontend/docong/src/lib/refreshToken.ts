import axios, { AxiosRequestConfig } from 'axios'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { BASE_URL } from '../api/auth'

const refresh = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const refreshToken = localStorage.getItem('refreshToken')
  let jwtToken = localStorage.getItem('jwtToken')

  if (refreshToken) {
    if (jwtToken) {
      const { exp } = jwtDecode<JwtPayload>(jwtToken)
      if (exp && Date.now() >= exp * 1000) {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/user/refreshToken`,
            { headers: { RefreshToken: `Bearer ${refreshToken}` } }
          )
          const newJwtToken = response.headers.authorization.split(' ')[1]
          localStorage.setItem('jwtToken', newJwtToken)
          jwtToken = newJwtToken
        } catch (e: any) {
          alert('로그인 유지 기간이 만료되었습니다.')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('jwtToken')
        }
      }
    }
  }

  if (!config.headers) {
    config.headers = {}
  }
  config.headers['authorization'] = `Bearer ${jwtToken}`

  return config
}

export { refresh }
