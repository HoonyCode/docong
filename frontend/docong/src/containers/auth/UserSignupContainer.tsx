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
import { useEffect, useState } from 'react'
import { RootState } from '../../modules'
import HeaderLogo from '../../components/auth/HeaderLogo'
import { Box } from '@mui/material'
import CheckModal from '../../components/auth/CheckModal'

function UserSignupContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status } = useSelector((state: RootState) => state.user.userTimer)
  const [isOpenCheckToLogin, setIsOpenCheckToLogin] = useState(false)

  useEffect(() => {
    if (status === 'play') {
      navigate('/')
    }
  })

  const onClickToLogin = () => {
    navigate('/')
  }

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
    console.error(googleLoginError)
  }

  return (
    <>
      <HeaderLogo size="26%" setIsOpenCheckToLogin={setIsOpenCheckToLogin} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <UserSignupForm
          onSignupSubmit={onSignupSubmit}
          setIsOpenCheckToLogin={setIsOpenCheckToLogin}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '18%',
            minWidth: 300,
            p: '1vh',
          }}
        >
          <GoogleLogin
            clientId="402744381856-cvss5niacafgsm9c6i4baua6ofeqej10.apps.googleusercontent.com"
            onSuccess={onSuccessGoogleLogin}
            onFailure={onFailureGoogleLogin}
            cookiePolicy="single_host_origin"
          />
        </Box>
      </Box>
      <CheckModal
        isOpenCheckModal={isOpenCheckToLogin}
        setIsOpenCheckModal={setIsOpenCheckToLogin}
        onClick={onClickToLogin}
        title="로그인으로 이동"
        content="작성했던 내용은 지워집니다."
        leftButton="이동"
        rightButton="취소"
      />
    </>
  )
}

export default UserSignupContainer
