import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/'

export async function userSignup(signupData: SignupData) {
  alert('가입요청')
  const response = await axios.post(`${BASE_URL}user/join`, signupData)
  return response.data
}

export interface SignupResponse {
  response: number
  message: string
}

export interface SignupData {
  email: string
  password: string
  name: string
  birth: string
  gender: string
  address: string
  job: string
  position: string
}
