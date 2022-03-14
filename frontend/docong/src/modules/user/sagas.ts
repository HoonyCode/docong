import {
  USER_SIGNUP,
  USER_LOGIN,
  userSignupAsync,
  userLoginAsync,
  userGoogleLoginAsync,
  USER_GOOGLE_LOGIN,
} from './actions'
import {
  userSignup,
  userLogin,
  userGoogleLogin,
  SignupResponse,
  LoginHeader,
} from '../../api/auth'
import { call, put, takeEvery } from 'redux-saga/effects'

function* userSignupSaga(action: ReturnType<typeof userSignupAsync.request>) {
  try {
    console.log(action)
    console.log(action.payload)
    // call : 함수 실행 (함수, 파라미터)
    const signupResponse: SignupResponse = yield call(
      userSignup,
      action.payload.signupInput
    )
    alert('회원가입이 완료되었습니다.')
    console.log(signupResponse)
    // 회원가입 후 로그인 페이지로 이동
    yield action.payload.navigate('/login')
    // put : 특정 액션을 dispatch
    yield put(userSignupAsync.success(signupResponse))
  } catch (e: any) {
    alert('회원가입 실패')
    yield put(userSignupAsync.failure(e))
  }
}

function* userLoginSaga(action: ReturnType<typeof userLoginAsync.request>) {
  try {
    const loginHeader: LoginHeader = yield call(userLogin, action.payload)
    alert('로그인이 완료되었습니다.')
    console.log(loginHeader)
    // localStorage.setItem('JWT', loginHeader.accessToken)
    yield action.payload.navigate('/')
  } catch (e: any) {
    alert('로그인 실패')
  }
}

function* userGoogleLoginSaga(
  action: ReturnType<typeof userGoogleLoginAsync.request>
) {
  try {
    const jwtToken: string = yield call(
      userGoogleLogin,
      action.payload.googleLoginResponse
    )
    alert('구글 로그인이 완료되었습니다.')
    localStorage.setItem('jwtToken', jwtToken)
    yield action.payload.navigate('/')
  } catch (e: any) {
    alert('구글 로그인 실패')
  }
}

export function* userSaga() {
  yield takeEvery(USER_SIGNUP, userSignupSaga)
  yield takeEvery(USER_LOGIN, userLoginSaga)
  yield takeEvery(USER_GOOGLE_LOGIN, userGoogleLoginSaga)
}
