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
    mbti: userInfo ? userInfo.mbti : '',
    birth: userInfo ? userInfo.birth : '',
    gender: userInfo ? userInfo.gender : '',
    job: userInfo ? userInfo.job : '',
    name: userInfo ? userInfo.name : '',
    position: userInfo ? userInfo.position : 0,
  })

  const genderList = ['Female', 'Male']
  const mbtiList = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ',
  ]
  const jobList = [
    '경영/사무',
    '마케팅/무역/유통',
    '영업/고객상담',
    'IT/인터넷',
    '연구개발/설계',
    '생산/제조',
    '전문/특수직',
    '디자인',
    '미디어',
    '서비스',
    '건설',
  ]

  useEffect(() => {
    if (isOpenEditUserForm === true) {
      setUserInfoInput({
        mbti: userInfo ? userInfo.mbti : '',
        birth: userInfo ? userInfo.birth : '',
        gender: userInfo ? userInfo.gender : '',
        job: userInfo ? userInfo.job : '',
        name: userInfo ? userInfo.name : '',
        position: userInfo ? userInfo.position : 0,
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

  const onChangeUserMbti = (e: SelectChangeEvent<string>) => {
    setUserInfoInput({ ...userInfoInput, mbti: e.target.value })
  }

  const onChangeUserJob = (e: SelectChangeEvent<string>) => {
    setUserInfoInput({ ...userInfoInput, job: e.target.value })
  }

  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfoInput({ ...userInfoInput, name: e.target.value })
  }

  const onChangeUserPosition = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfoInput({ ...userInfoInput, position: Number(e.target.value) })
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
          <InputLabel id="mbti">MBTI</InputLabel>
          <Select
            required
            fullWidth
            labelId="mbti"
            id="mbti"
            value={userInfoInput.mbti}
            onChange={onChangeUserMbti}
          >
            {mbtiList.map((mbti, index) => (
              <MenuItem key={index} value={mbti}>
                {mbti}
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
              <MenuItem key={index} value={job}>
                {job}
              </MenuItem>
            ))}
          </Select>
          <TextField
            required
            fullWidth
            type="number"
            InputProps={{
              inputProps: {
                max: 30,
                min: 0,
              },
            }}
            label="Position"
            onChange={onChangeUserPosition}
            value={userInfoInput.position}
          />
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
