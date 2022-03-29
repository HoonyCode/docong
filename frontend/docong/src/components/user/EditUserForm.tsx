import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Grid,
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
    image: userInfo ? userInfo.image : '',
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
        image: userInfo ? userInfo.image : '',
      })
      setDate(userInfo ? new Date(userInfo.birth) : null)
    }
  }, [isOpenEditUserForm, userInfo])

  const onChangeUserBirth = (newDate: any) => {
    setDate(newDate)
    if (newDate !== null && String(newDate) !== 'Invalid Date') {
      setUserInfoInput({
        ...userInfoInput,
        birth: newDate.toISOString(),
      })
    } else {
      setUserInfoInput({
        ...userInfoInput,
        birth: '',
      })
    }
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
    if (userInfoInput.birth !== '') {
      editUser(userInfoInput)
    } else {
      alert('날짜 형식이 올바르지 않습니다.')
    }
  }

  return (
    <Dialog open={isOpenEditUserForm} onClose={closeEditUserForm}>
      <DialogTitle
        sx={{
          fontSize: '24px',
          fontWeight: 'bold',
          p: '28px',
          pb: '4px',
          color: (theme) => theme.colors.greenText,
        }}
      >
        내 정보 수정하기
      </DialogTitle>
      <Box component="form" onSubmit={onSubmitEditUser}>
        <DialogContent>
          <Grid container>
            <Grid item xs={3}>
              <Box
                sx={{
                  display: 'flex',
                  height: '56px',
                  ml: '10px',
                  mb: '14px',
                  justifyContent: 'start',
                  alignItems: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                <div>이름</div>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  height: '56px',
                  ml: '10px',
                  mb: '14px',
                  justifyContent: 'start',
                  alignItems: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                <div>생년월일</div>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  height: '56px',
                  ml: '10px',
                  mb: '14px',
                  justifyContent: 'start',
                  alignItems: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                <div>성별</div>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  height: '56px',
                  ml: '10px',
                  mb: '14px',
                  justifyContent: 'start',
                  alignItems: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                <div>MBTI</div>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  height: '56px',
                  ml: '10px',
                  mb: '14px',
                  justifyContent: 'start',
                  alignItems: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                <div>직업</div>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  height: '56px',
                  ml: '10px',
                  mb: '14px',
                  justifyContent: 'start',
                  alignItems: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                }}
              >
                <div>경력</div>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                fullWidth
                id="name"
                variant="outlined"
                onChange={onChangeUserName}
                value={userInfoInput.name}
                color="success"
                sx={{ mb: '14px' }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={date}
                  onChange={onChangeUserBirth}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      sx={{ mb: '14px' }}
                      color="success"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
              <Select
                required
                fullWidth
                id="gender"
                value={userInfoInput.gender}
                onChange={onChangeUserGender}
                color="success"
                sx={{ mb: '14px' }}
              >
                {genderList.map((gender, index) => (
                  <MenuItem key={index} value={gender.toUpperCase()}>
                    {gender === 'Female' ? '여성' : '남성'}
                  </MenuItem>
                ))}
              </Select>
              <Select
                required
                fullWidth
                id="mbti"
                value={userInfoInput.mbti}
                onChange={onChangeUserMbti}
                color="success"
                sx={{ mb: '14px' }}
              >
                {mbtiList.map((mbti, index) => (
                  <MenuItem key={index} value={mbti}>
                    {mbti}
                  </MenuItem>
                ))}
              </Select>
              <Select
                required
                fullWidth
                id="job"
                value={userInfoInput.job}
                onChange={onChangeUserJob}
                color="success"
                sx={{ mb: '14px' }}
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
                onChange={onChangeUserPosition}
                value={userInfoInput.position}
                color="success"
                sx={{ mb: '14px' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: '0 24px 20px 24px' }}>
          <Button
            sx={{
              width: '22%',
              fontSize: '16px',
              color: (theme) => theme.colors.pageBg,
              background: (theme) => theme.colors.greenButton,
              borderRadius: '8px',
              mr: '8px',
            }}
            variant="contained"
            color="success"
            type="submit"
          >
            수정하기
          </Button>
          <Button
            sx={{
              width: '22%',
              fontSize: '16px',
              color: (theme) => theme.colors.pageBg,
              background: (theme) => theme.colors.gray,
              borderRadius: '8px',
            }}
            onClick={closeEditUserForm}
            variant="contained"
            color="success"
          >
            취소
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  )
}

export default EditUserForm
