import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { BASE_URL, SignupData } from '../../api/auth'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import EmailCheckForm from './EmailCheckForm'

interface UserSignupFormProps {
  onSignupSubmit: (signupInput: SignupData, isCheckedEmail: boolean) => void
}

function UserSignupForm({ onSignupSubmit }: UserSignupFormProps) {
  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    name: '',
    birth: '',
    gender: '',
    address: '',
    job: '',
    position: '',
  })

  const [passwordData, setPasswordData] = useState({
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  })

  const [isCheckedEmail, setIsCheckedEmail] = useState(false)
  const [isOpenEmailCheckForm, setIsOpenEmailCheckForm] = useState(false)
  const [realCheckNumber, setRealCheckNumber] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    document.title = `docong`
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (signupInput.password === passwordData.confirmPassword) {
      const passwordRegExp =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,15}$/
      if (passwordRegExp.test(signupInput.password)) {
        onSignupSubmit(signupInput, isCheckedEmail)
      } else {
        alert(
          '비밀번호는 문자, 숫자, 특수문자를 포함한 8~15자리 형태여야 합니다.'
        )
      }
    } else {
      alert('패스워드가 동일하지 않습니다.')
    }
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupInput({ ...signupInput, email: e.target.value })
    setIsCheckedEmail(false)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupInput({ ...signupInput, password: e.target.value })
  }

  const onClickShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPasswordData({
      ...passwordData,
      showPassword: !passwordData.showPassword,
    })
  }

  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
  }

  const onClickShowConfirmPassword = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPasswordData({
      ...passwordData,
      showConfirmPassword: !passwordData.showConfirmPassword,
    })
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupInput({ ...signupInput, name: e.target.value })
  }

  const onClickEmailCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    const gmailRegExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@gmail.[a-zA-Z]{2,3}$/i
    if (regExp.test(signupInput.email)) {
      if (gmailRegExp.test(signupInput.email)) {
        alert('gmail은 하단의 버튼으로 로그인 가능합니다.')
      } else {
        try {
          const emailCheckResponse: any = await axios.post(
            `${BASE_URL}/api/user/duplicate`,
            {
              email: signupInput.email,
            }
          )
          if (emailCheckResponse.data.possible) {
            alert('사용 가능한 이메일입니다.')
            setIsOpenEmailCheckForm(true)
          } else {
            alert('이미 가입되어 있는 이메일입니다.')
          }
        } catch (e: any) {
          console.error(e)
        }
      }
    } else {
      alert('올바른 이메일 형식을 입력해주세요.')
    }
  }

  const closeEmailCheckForm = () => {
    setIsOpenEmailCheckForm(false)
  }

  const checkEmail = () => {
    setIsCheckedEmail(true)
  }

  const onClickToLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        minWidth: '600px',
      }}
    >
      <Box sx={{ width: '12%', minWidth: '200px', py: '1vh' }}>
        <Box
          sx={{
            display: 'flex',
            height: '40px',
            mb: '2vh',
            justifyContent: 'end',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          <div>이메일</div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            height: '40px',
            mb: '2vh',
            justifyContent: 'end',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          <div>이름</div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            height: '40px',
            mb: '2vh',
            justifyContent: 'end',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          <div>비밀번호</div>
        </Box>
        <Box
          sx={{
            display: 'flex',
            height: '40px',
            justifyContent: 'end',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          <div>비밀번호 확인</div>
        </Box>
      </Box>
      <Box
        component="form"
        sx={{
          width: '18%',
          minWidth: '300px',
          p: '1vh',
        }}
        onSubmit={onSubmit}
      >
        <TextField
          required
          fullWidth
          size="small"
          id="email"
          placeholder="docong@email.com"
          variant="outlined"
          onChange={onChangeEmail}
          value={signupInput.email}
          color="success"
          sx={{ background: 'white', mb: '2vh' }}
        />
        <TextField
          required
          fullWidth
          size="small"
          id="name"
          placeholder="김두콩"
          variant="outlined"
          onChange={onChangeName}
          value={signupInput.name}
          color="success"
          sx={{ background: 'white', mb: '2vh' }}
        />
        <FormControl
          required
          fullWidth
          size="small"
          variant="outlined"
          color="success"
          sx={{ background: 'white', mb: '2vh' }}
        >
          <OutlinedInput
            id="password"
            type={passwordData.showPassword ? 'text' : 'password'}
            value={signupInput.password}
            onChange={onChangePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onClickShowPassword}
                  edge="end"
                >
                  {passwordData.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl
          required
          fullWidth
          size="small"
          variant="outlined"
          color="success"
          sx={{ background: 'white', mb: '3vh' }}
        >
          <OutlinedInput
            id="confirm-password"
            type={passwordData.showConfirmPassword ? 'text' : 'password'}
            value={passwordData.confirmPassword}
            onChange={onChangeConfirmPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onClickShowConfirmPassword}
                  edge="end"
                >
                  {passwordData.showConfirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            sx={{
              width: '46%',
              fontSize: '16px',
              py: '3px',
              background: (theme) => theme.colors.greenButton,
            }}
            variant="contained"
            type="submit"
            color="success"
          >
            회원가입
          </Button>
          <Button
            sx={{
              width: '46%',
              fontSize: '16px',
              py: '3px',
              background: (theme) => theme.colors.gray,
            }}
            variant="contained"
            onClick={onClickToLogin}
            color="success"
          >
            로그인
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: '12%', minWidth: '200px' }}>
        {!isCheckedEmail && (
          <Button
            sx={{
              width: '50%',
              fontSize: '16px',
              mt: '1.5vh',
              py: '2px',
              background: (theme) => theme.colors.greenButton,
            }}
            variant="contained"
            onClick={onClickEmailCheck}
            color="success"
          >
            중복확인
          </Button>
        )}
        {isCheckedEmail && (
          <Button
            sx={{
              width: '50%',
              fontSize: '16px',
              mt: '1.5vh',
              py: '2px',
              background: (theme) => theme.colors.gray,
            }}
            variant="contained"
            color="success"
          >
            확인완료
          </Button>
        )}
      </Box>
      <EmailCheckForm
        email={signupInput.email}
        realCheckNumber={realCheckNumber}
        isOpenEmailCheckForm={isOpenEmailCheckForm}
        closeEmailCheckForm={closeEmailCheckForm}
        checkEmail={checkEmail}
        setRealCheckNumber={setRealCheckNumber}
      />
    </Box>
  )
}

export default UserSignupForm
