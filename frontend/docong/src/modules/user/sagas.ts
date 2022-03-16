import {
  USER_SIGNUP,
  USER_LOGIN,
  userSignupAsync,
  userLoginAsync,
  userGoogleLoginAsync,
  USER_GOOGLE_LOGIN,
  START_USER_TIMER,
  changeUserTimerStatus,
  stopUserTimer,
  changeUserTimerTime,
  savePomoAsync,
  SAVE_POMO,
  getUserInfoAsync,
  GET_USER_INFO,
} from './actions'
import {
  userSignup,
  userLogin,
  userGoogleLogin,
  SignupResponse,
  LoginHeader,
  GoogleLoginResponseData,
} from '../../api/auth'
import {
  all,
  call,
  cancel,
  delay,
  flush,
  fork,
  put,
  race,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects'
import { buffers, EventChannel, Task } from 'redux-saga'
import { closeChannel, subscribe } from './channel'
import { savePomo } from '../../api/pomo'
import { getUserInfo, UserInfo } from '../../api/user'

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
    const loginHeader: LoginHeader = yield call(
      userLogin,
      action.payload.loginInput
    )
    alert('로그인이 완료되었습니다.')
    console.log(loginHeader)
    // localStorage.setItem('jwtToken', loginHeader.accessToken)
    yield action.payload.navigate('/')
    yield put(getUserInfoAsync.request(null))
  } catch (e: any) {
    alert('로그인 실패')
  }
}

function* userGoogleLoginSaga(
  action: ReturnType<typeof userGoogleLoginAsync.request>
) {
  try {
    const googleLoginResponseData: GoogleLoginResponseData = yield call(
      userGoogleLogin,
      action.payload.googleLoginResponse
    )
    alert('구글 로그인이 완료되었습니다.')
    localStorage.setItem('jwtToken', googleLoginResponseData.jwtToken)
    yield action.payload.navigate('/')
    yield put(getUserInfoAsync.request(null))
  } catch (e: any) {
    alert('구글 로그인 실패')
  }
}

function* getUserInfoSaga(action: ReturnType<typeof getUserInfoAsync.request>) {
  try {
    const userInfo: UserInfo = yield call(getUserInfo)
    alert('유저 정보 요청완료')
    console.log('유저 정보 :', userInfo)
    yield put(getUserInfoAsync.success(userInfo))
  } catch (e: any) {
    alert('유저 정보 요청실패')
    console.log(e)
    yield put(getUserInfoAsync.failure(e))
  }
}

function* startUserTimerSaga() {
  const userTimerSelectedType: { name: string; time: number } = yield select(
    (state) => state.user.userTimer.selectedType
  )
  try {
    const worker: Task[] = yield fork(connectChannel)
    yield take(stopUserTimer)
    yield cancel(worker)
  } catch (e) {
    console.error(e)
  } finally {
    yield all([
      put(changeUserTimerStatus('stop')),
      put(changeUserTimerTime(userTimerSelectedType.time)),
    ])
  }
}

function* connectChannel() {
  let channel: EventChannel<any>
  try {
    const timer = 1000
    const buffer = buffers.sliding(1)

    const param = { buffer, timer }
    channel = yield call(subscribe, param)

    while (true) {
      const { message } = yield flush(channel)
      const time: number = yield select((state) => state.user.userTimer.time)
      yield put(changeUserTimerTime(time - 1))
      const { timeout } = yield race({ timeout: delay(timer) })
    }
  } catch (e) {
    console.error(e)
  } finally {
    closeChannel(channel!)
  }
}

function* savePomoSaga(action: ReturnType<typeof savePomoAsync.request>) {
  try {
    yield call(savePomo, action.payload)
    alert('Pomo 저장이 완료되었습니다.')
  } catch (e: any) {
    alert('Pomo 저장 실패')
  }
}

export function* userSaga() {
  yield takeEvery(USER_SIGNUP, userSignupSaga)
  yield takeEvery(USER_LOGIN, userLoginSaga)
  yield takeEvery(USER_GOOGLE_LOGIN, userGoogleLoginSaga)
  yield takeEvery(GET_USER_INFO, getUserInfoSaga)
  yield takeEvery(START_USER_TIMER, startUserTimerSaga)
  yield takeEvery(SAVE_POMO, savePomoSaga)
}
