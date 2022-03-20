import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SignupData } from '../../api/auth'
import UserSignupForm from '../../components/auth/UserSignupForm'
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'
import { userGoogleLoginAsync, userSignupAsync } from '../../modules/user'
import { useEffect } from 'react'
import { RootState } from '../../modules'

function UserSignupContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status } = useSelector((state: RootState) => state.user.userTimer)

  useEffect(() => {
    if (status === 'play') {
      navigate('/')
    }
  })

  // 회원가입 요청
  const onSignupSubmit = (signupInput: SignupData, isCheckedEmail: boolean) => {
    if (isCheckedEmail) {
      dispatch(userSignupAsync.request({ signupInput: signupInput, navigate }))
    } else {
      alert('이메일 중복 확인을 진행해주세요.')
    }
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
