import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { BASE_URL } from '../../api/auth'

interface EmailCheckFormProps {
  email: string
  realCheckNumber: string
  isOpenEmailCheckForm: boolean
  closeEmailCheckForm: () => void
  checkEmail: () => void
  setRealCheckNumber: (realCheckNumber: string) => void
}

function EmailCheckForm({
  email,
  realCheckNumber,
  isOpenEmailCheckForm,
  closeEmailCheckForm,
  checkEmail,
  setRealCheckNumber,
}: EmailCheckFormProps) {
  const [checkNumber, setCheckNumber] = useState('')

  useEffect(() => {
    setCheckNumber('')
    setRealCheckNumber('')
  }, [isOpenEmailCheckForm, setRealCheckNumber])

  const sendCheckNumber = async () => {
    try {
      const emailNumberResponse: any = await axios.get(
        `${BASE_URL}/api/user/${email}`
      )
      setRealCheckNumber(String(emailNumberResponse.data))
      alert('메일에서 인증번호를 확인해주세요.')
    } catch (e: any) {
      console.error(e)
    }
  }

  const onSubmitEmailCheck = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (checkNumber === realCheckNumber) {
      alert('이메일 인증이 완료되었습니다.')
      checkEmail()
      closeEmailCheckForm()
    } else {
      alert('인증번호가 적합하지 않습니다.')
    }
  }

  return (
    <Dialog open={isOpenEmailCheckForm} onClose={closeEmailCheckForm}>
      <DialogTitle
        sx={{
          width: '450px',
          fontSize: '24px',
          fontWeight: 'bold',
          p: '28px',
          pb: '4px',
          color: (theme) => theme.colors.greenText,
        }}
      >
        이메일 인증하기
      </DialogTitle>
      <Box
        sx={{ width: '100%' }}
        component="form"
        onSubmit={onSubmitEmailCheck}
      >
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              height: '24px',
              ml: '10px',
              mb: '32px',
              justifyContent: 'start',
              alignItems: 'center',
              fontSize: '17px',
            }}
            onClick={sendCheckNumber}
          >
            <div>버튼을 클릭하면 메일로 인증번호가 전송됩니다.</div>
          </Box>
          <Grid container>
            <Grid item xs={7}>
              <TextField
                required
                fullWidth
                id="number"
                variant="outlined"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCheckNumber(e.target.value)
                }
                value={checkNumber}
                color="success"
                size="small"
                sx={{ mb: '14px', pl: '10px' }}
              />
            </Grid>
            <Grid item xs={5}>
              <Button
                sx={{
                  width: '90%',
                  height: '40px',
                  ml: '10px',
                  fontSize: '16px',
                  background: (theme) => theme.colors.greenButton,
                }}
                variant="contained"
                onClick={sendCheckNumber}
                color="success"
              >
                인증번호 전송
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: '0 24px 20px 24px' }}>
          <Button
            sx={{
              width: '100px',
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
            인증하기
          </Button>
          <Button
            sx={{
              width: '22%',
              fontSize: '16px',
              color: (theme) => theme.colors.pageBg,
              background: (theme) => theme.colors.gray,
              borderRadius: '8px',
            }}
            onClick={closeEmailCheckForm}
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

export default EmailCheckForm
