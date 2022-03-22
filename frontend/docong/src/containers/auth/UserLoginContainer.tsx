import { useDispatch, useSelector } from 'react-redux'
import { LoginData } from '../../api/auth'
import UserLoginForm from '../../components/auth/UserLoginForm'
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'
import { userGoogleLoginAsync, userLoginAsync } from '../../modules/user'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { RootState } from '../../modules'

function UserLoginContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status } = useSelector((state: RootState) => state.user.userTimer)

  useEffect(() => {
    if (status === 'play') {
      navigate('/')
    }
  })

  // 로그인 요청
  const onLoginSubmit = (loginInput: LoginData) => {
    dispatch(userLoginAsync.request({ loginInput: loginInput, navigate }))
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
      <UserLoginForm onLoginSubmit={onLoginSubmit} />
      <GoogleLogin
        clientId="402744381856-cvss5niacafgsm9c6i4baua6ofeqej10"
        onSuccess={onSuccessGoogleLogin}
        onFailure={onFailureGoogleLogin}
        cookiePolicy="single_host_origin"
      />
    </>
  )
}

export default UserLoginContainer
