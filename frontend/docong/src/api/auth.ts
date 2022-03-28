import axios from 'axios'
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'

export const BASE_URL = ''

const config = {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
}

export async function userSignup(signupData: SignupData) {
  const response = await axios.post(`${BASE_URL}/api/user/join`, signupData)
  return response.data
}

export async function emailDuplicateCheck(email: string) {
  const response = await axios.post(`${BASE_URL}/api/user/duplicate`, email)
  return response.data
}

export async function userLogin(loginData: LoginData) {
  const response = await axios.post(`${BASE_URL}/api/user/login`, loginData)
  return {
    authorization: response.headers.authorization.split(' ')[1],
    refreshToken: response.headers.refreshtoken.split(' ')[1],
  }
}

export async function userGoogleLogin(
  googleLoginResponse: GoogleLoginResponse | GoogleLoginResponseOffline
) {
  const response = await axios.post(
    `${BASE_URL}/api/oauth/jwt/google`,
    JSON.stringify(googleLoginResponse),
    config
  )
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

export interface EmailDuplicateCheckResponse {
  possible: boolean
}

export interface LoginData {
  email: string
  password: string
}

export interface LoginResponseHeaders {
  authorization: string
  refreshToken: string
}

export interface GoogleLoginResponseData {
  jwtToken: string
  newUser: boolean
  refreshToken: string
}
