import axios from 'axios'

const setHeader = function () {
  const token = localStorage.getItem('jwtToken')
  const header = {
    Authorization: `Bearer ${token}`,
  }
  return header
}

export async function getUserInfo() {
  alert('유저 정보 요청')
  const response = await axios.get(`/api/user/info`, { headers: setHeader() })
  return response.data
}

export interface UserInfo {
  email: string
  name: string
  birth: string
  gender: string
  address: string
  job: string
  position: string
}
