import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SignupData } from '../../api/auth'
import UserSignupForm from '../../components/auth/UserSignupForm'
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'
import { userGoogleLoginAsync, userSignupAsync } from '../../modules/user'

function UserSignupContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 회원가입 요청
  const onSignupSubmit = (signupInput: SignupData) => {
    dispatch(userSignupAsync.request({ signupInput: signupInput, navigate }))
  }

  // 구글 로그인 요청
  const onSuccessGoogleLogin = (
    googleLoginResponse: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    dispatch(
      userGoogleLoginAsync.request({
        googleLoginResponse: googleLoginResponse,
        navigate,
      })
    )
  }

  const onFailureGoogleLogin = (googleLoginError: any) => {
    alert('구글 로그인 연동 실패')
    console.log(googleLoginError)
  }

  return (
    <>
      <UserSignupForm onSignupSubmit={onSignupSubmit} />
      <GoogleLogin
        clientId="402744381856-cvss5niacafgsm9c6i4baua6ofeqej10.apps.googleusercontent.com"
        onSuccess={onSuccessGoogleLogin}
        onFailure={onFailureGoogleLogin}
        cookiePolicy="single_host_origin"
      />
    </>
  )
}

export default UserSignupContainer
