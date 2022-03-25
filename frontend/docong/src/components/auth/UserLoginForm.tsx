import React, { FormEvent, useState, ChangeEvent, useEffect } from 'react'
import { LoginData } from '../../api/auth'
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
import { lighten } from 'polished'

interface UserLoginFormProps {
  onLoginSubmit: (loginInput: LoginData) => void
}

function UserLoginForm({ onLoginSubmit }: UserLoginFormProps) {
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    document.title = `docong`
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onLoginSubmit(loginInput)
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, email: e.target.value })
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, password: e.target.value })
  }

  const onClickShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowPassword(!showPassword)
  }

  const onClickToSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/join')
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
            justifyContent: 'end',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          <div>비밀번호</div>
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
          value={loginInput.email}
          color="success"
          sx={{ background: 'white', mb: '2vh' }}
        />
        <FormControl
          required
          fullWidth
          size="small"
          variant="outlined"
          color="success"
          sx={{ background: 'white', mb: '3vh' }}
        >
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={loginInput.password}
            onChange={onChangePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
            로그인
          </Button>
          <Button
            sx={{
              width: '46%',
              fontSize: '16px',
              py: '3px',
              background: (theme) => theme.colors.gray,
            }}
            variant="contained"
            onClick={onClickToSignup}
            color="success"
          >
            회원가입
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: '12%', minWidth: '200px' }}></Box>
    </Box>
  )
}

export default UserLoginForm
