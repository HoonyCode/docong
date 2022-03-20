import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../modules'

function EditUserForm() {
  const userInfo = useSelector((state: RootState) => state.user.userInfo.data)

  const [userInfoInput, setUserInfoInput] = useState({
    address: userInfo ? userInfo.address : '',
    birth: userInfo ? userInfo.birth : '',
    gender: userInfo ? userInfo.gender : '',
    job: userInfo ? userInfo.job : '',
    name: userInfo ? userInfo.name : '',
    password: '',
    position: userInfo ? userInfo.position : '',
  })

  const genderList = ['Female', 'Male']

  const onChangeUserAddress = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfoInput({ ...userInfoInput, address: e.target.value })
  }

  const onChangeUserBirth = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfoInput({ ...userInfoInput, birth: e.target.value })
  }

  const onChangeUserGender = (e: SelectChangeEvent<string>) => {
    setUserInfoInput({ ...userInfoInput, gender: e.target.value })
  }

  const onChangeUserJob = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfoInput({ ...userInfoInput, job: e.target.value })
  }

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfoInput({ ...userInfoInput, name: e.target.value })
  }

  const onChangeUserPosition = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfoInput({ ...userInfoInput, position: e.target.value })
  }

  const onSubmitEditUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const closeEditUser = () => {}

  return (
    <>
      <DialogTitle>EditUserInfo</DialogTitle>
      <Box component="form" onSubmit={onSubmitEditUser}>
        <DialogContent>
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            variant="outlined"
            onChange={onChangeUserName}
            value={userInfoInput.name}
          />
          <TextField
            required
            fullWidth
            id="birth"
            label="Birth"
            variant="outlined"
            onChange={onChangeUserBirth}
            value={userInfoInput.birth}
          />
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            fullWidth
            labelId="gender"
            id="gender"
            value={userInfoInput.gender}
            onChange={onChangeUserGender}
          >
            {genderList.map((gender, index) => (
              <MenuItem key={index} value={gender.toUpperCase()}>
                {gender}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Edit</Button>
          <Button onClick={closeEditUser}>Cancel</Button>
        </DialogActions>
      </Box>
    </>
  )
}
