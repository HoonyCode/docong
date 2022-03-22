import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserData } from '../../api/user'
import { RootState } from '../../modules'

interface EditUserFormProps {
  isOpenEditUserForm: boolean
  closeEditUserForm: () => void
  editUser: (userData: UserData) => void
}

function EditUserForm({
  isOpenEditUserForm,
  closeEditUserForm,
  editUser,
}: EditUserFormProps) {
  const userInfo = useSelector((state: RootState) => state.user.userInfo.data)
  const [date, setDate] = useState<Date | null>(null)

  const [userInfoInput, setUserInfoInput] = useState({
    address: userInfo ? userInfo.address : '',
    birth: userInfo ? userInfo.birth : '',
    gender: userInfo ? userInfo.gender : '',
    job: userInfo ? userInfo.job : '',
    name: userInfo ? userInfo.name : '',
    position: userInfo ? userInfo.position : '',
  })

  const genderList = ['Female', 'Male']
  const jobList = ['Job1', 'Job2', 'Job3']
  const positionList = ['Pos1', 'Pos2', 'Pos3']

  useEffect(() => {
    if (isOpenEditUserForm === true) {
      setUserInfoInput({
        address: '1',
        birth: userInfo ? userInfo.birth : '',
        gender: userInfo ? userInfo.gender : '',
        job: userInfo ? userInfo.job : '',
        name: userInfo ? userInfo.name : '',
        position: userInfo ? userInfo.position : '',
      })
      setDate(null)
    }
  }, [isOpenEditUserForm, userInfo])

  const onChangeUserBirth = (newDate: any) => {
    setDate(newDate)
    setUserInfoInput({
      ...userInfoInput,
      birth: newDate.toISOString().slice(0, 10),
    })
  }

  const onChangeUserGender = (e: SelectChangeEvent<string>) => {
    setUserInfoInput({ ...userInfoInput, gender: e.target.value })
  }

  const onChangeUserJob = (e: SelectChangeEvent<string>) => {
    setUserInfoInput({ ...userInfoInput, job: e.target.value })
  }

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfoInput({ ...userInfoInput, name: e.target.value })
  }

  const onChangeUserPosition = (e: SelectChangeEvent<string>) => {
    setUserInfoInput({ ...userInfoInput, position: e.target.value })
  }

  const onSubmitEditUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    editUser(userInfoInput)
  }

  return (
    <Dialog open={isOpenEditUserForm} onClose={closeEditUserForm}>
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
          <LocalizationProvider required dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Birth"
              value={date}
              onChange={onChangeUserBirth}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            required
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
          <InputLabel id="job">Job</InputLabel>
          <Select
            required
            fullWidth
            labelId="job"
            id="job"
            value={userInfoInput.job}
            onChange={onChangeUserJob}
          >
            {jobList.map((job, index) => (
              <MenuItem key={index} value={job.toUpperCase()}>
                {job}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="position">Position</InputLabel>
          <Select
            required
            fullWidth
            labelId="position"
            id="position"
            value={userInfoInput.position}
            onChange={onChangeUserPosition}
          >
            {positionList.map((position, index) => (
              <MenuItem key={index} value={position.toUpperCase()}>
                {position}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Edit</Button>
          <Button onClick={closeEditUserForm}>Cancel</Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default EditUserForm
