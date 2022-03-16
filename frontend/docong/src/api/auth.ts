import axios from 'axios'
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'

const BASE_URL = 'http://localhost:8080/api/'

const config = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
}

export async function userSignup(signupData: SignupData) {
  alert('가입 요청')
  const response = await axios.post(`${BASE_URL}user/join`, signupData)
  // debug
  console.log('가입 요청 데이터 :', response.data)
  return response.data
}

export async function userLogin(loginData: LoginData) {
  alert('로그인 요청')
  console.log(loginData)
  const response = await axios.post(`${BASE_URL}user/login`, loginData)
  // debug
  console.log('로그인 요청 데이터 :', response.data)
  return response.data
}

export async function userGoogleLogin(
  googleLoginResponse: GoogleLoginResponse | GoogleLoginResponseOffline
) {
  alert('구글 로그인 요청')
  const response = await axios.post(
    `${BASE_URL}oauth/jwt/google`,
    JSON.stringify(googleLoginResponse),
    config
  )
  // debug
  console.log('구글 로그인 요청 데이터 :', response.data)
  return response.data
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

export interface SignupResponse {
  response: number
  message: string
}

export interface LoginData {
  email: string
  password: string
}

export interface LoginHeader {}
