import React, { FormEvent, useState, ChangeEvent } from 'react'
import { SignupData } from '../../api/user'
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

interface UserSignupFormProps {
  onSignupSubmit: (signupInput: SignupData) => void
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

  const navigate = useNavigate()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (signupInput.password === passwordData.confirmPassword) {
      onSignupSubmit(signupInput)
    } else {
      alert('패스워드가 동일하지 않습니다.')
    }
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupInput({ ...signupInput, email: e.target.value })
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

  const onClickToLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/login')
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
        value={signupInput.email}
      />
      <TextField
        required
        fullWidth
        id="name"
        label="Name"
        variant="outlined"
        onChange={onChangeName}
        value={signupInput.name}
      />
      <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
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
                {passwordData.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <FormControl required fullWidth variant="outlined">
        <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
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
          label="Confirm Password"
        />
      </FormControl>
      <Button variant="outlined" type="submit">
        Register
      </Button>
      <Button variant="outlined" onClick={onClickToLogin}>
        Log In
      </Button>
    </Box>
  )
}

export default UserSignupForm
