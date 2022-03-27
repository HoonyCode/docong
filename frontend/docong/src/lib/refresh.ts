import { AxiosRequestConfig } from 'axios'

const refresh = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const refreshToken = localStorage.getItem('refreshToken')
  let jwtToken = localStorage.getItem('jwtToken')

  return config
}
