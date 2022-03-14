import React, { FormEvent, useState, ChangeEvent } from 'react'
import { LoginData } from '../../api/user'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface UserLoginFormProps {
  onLoginSubmit: (loginInput: LoginData) => void
}

function UserLoginForm({ onLoginSubmit }: UserLoginFormProps) {
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)

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

  return (
    <Box
      component="form"
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
      onSubmit={onSubmit}
    >
      <TextField
        required
        fullWidth
        id="email"
        label="Email"
        variant="outlined"
        onChange={onChangeEmail}
        value={loginInput.email}
      />
      <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
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
          label="Password"
        />
      </FormControl>
      <button type="submit">로그인</button>
    </Box>
  )
}

export default UserLoginForm
