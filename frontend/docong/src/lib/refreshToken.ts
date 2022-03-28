import axios, { AxiosRequestConfig } from 'axios'

const refresh = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const refreshToken = localStorage.getItem('refreshToken')
  const expiredAt = localStorage.getItem('expiredAt')
  let jwtToken = localStorage.getItem('jwtToken')

  return config
}
