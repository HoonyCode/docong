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
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GroupCreateData } from '../../api/group'
import { RootState } from '../../modules'

interface GroupCreateFormProps {
  isOpenGroupCreateForm: boolean
  closeGroupCreateForm: () => void
  onCreateGroupSubmit: (groupCreateData: GroupCreateData) => void
}

function GroupCreateForm({
  isOpenGroupCreateForm,
  closeGroupCreateForm,
  onCreateGroupSubmit,
}: GroupCreateFormProps) {
  const userInfo = useSelector((state: RootState) => state.user.userInfo.data)

  const [createGroupInfo, setCreateGroupInfo] = useState({
    userEmail: userInfo ? userInfo.email : '',
    name: '',
  })

  useEffect(()=>{
    setCreateGroupInfo({
      userEmail: userInfo ? userInfo.email : '',
      name: '',
    })
  }, [userInfo])

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateGroupInfo({ ...createGroupInfo, name: e.target.value })
  }

  const onSubmitCreateGroup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (createGroupInfo.userEmail === '' || createGroupInfo.name === '') {
      alert('유효하지 않은 입력이 존재합니다.')
    } else {
      onCreateGroupSubmit(createGroupInfo)
    }
  }

  return (
    <div>
      <Dialog open={isOpenGroupCreateForm} onClose={closeGroupCreateForm}>
        <DialogTitle
          sx={{
            fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
            fontSize: '28px',
          }}
        >
          그룹 생성하기
        </DialogTitle>
        <Box component="form" onSubmit={onSubmitCreateGroup}>
          <DialogContent
            sx={{
              fontSize: '24px',
              fontWeight: 'bold',
              px: '28px',
              py: '8px',
              color: (theme) => theme.colors.greenText,
            }}
          >
            <Grid container>
              <Grid item xs={5}>
                <Box
                  sx={{
                    display: 'flex',
                    height: '56px',
                    ml: '10px',
                    mb: '14px',
                    justifyContent: 'start',
                    alignItems: 'center',
                    fontSize: '26px',
                    fontWeight: 'bold',
                  }}
                >
                  <div>그룹명</div>
                </Box>
              </Grid>
              <Grid item xs={7}>
                <TextField
                  required
                  fullWidth
                  id="jiraDomain"
                  variant="outlined"
                  onChange={onChangeName}
                  value={createGroupInfo.name}
                  color="success"
                  sx={{ mb: '14px' }}
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: '0 24px 20px 24px' }}>
            <Button
              sx={{
                width: '22%',
                fontSize: '16px',
                fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                color: (theme) => theme.colors.pageBg,
                background: (theme) => theme.colors.greenButton,
                borderRadius: '8px',
                mr: '8px',
              }}
              variant="contained"
              color="success"
              type="submit"
            >
              생성
            </Button>
            <Button
              sx={{
                width: '22%',
                fontSize: '16px',
                fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                color: (theme) => theme.colors.pageBg,
                background: (theme) => theme.colors.gray,
                borderRadius: '8px',
              }}
              onClick={closeGroupCreateForm}
              variant="contained"
              color="success"
            >
              취소
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  )
}

export default GroupCreateForm
