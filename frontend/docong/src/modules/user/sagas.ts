import { userSignupAsync, USER_SIGNUP } from './actions'
import { userSignup, SignupResponse } from '../../api/user'
import { call, put, takeEvery } from 'redux-saga/effects'

function* userSignupSaga(action: ReturnType<typeof userSignupAsync.request>) {
  try {
    // call : 함수 실행 (함수, 파라미터)
    const signupResponse: SignupResponse = yield call(
      userSignup,
      action.payload
    )
    alert('회원가입이 완료되었습니다.')
    console.log(signupResponse)
    // put : 특정 액션을 dispatch
    // yield put(userSignupAsync.success(signupResponse))
  } catch (e: any) {
    alert('Err')
    // yield put(userSignupAsync.failure(e))
  }
}

export function* userSaga() {
  yield takeEvery(USER_SIGNUP, userSignupSaga)
}
