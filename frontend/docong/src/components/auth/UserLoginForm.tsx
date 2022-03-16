import React, { FormEvent, useState, ChangeEvent } from 'react'
import { LoginData } from '../../api/auth'
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

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
      <Button variant="outlined" type="submit">
        Log In
      </Button>
      <Button variant="outlined" onClick={onClickToSignup}>
        Register
      </Button>
    </Box>
  )
}

export default UserLoginForm
