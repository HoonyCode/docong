import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Group, GroupModifyData } from '../../api/group'
import { RootState } from '../../modules'

interface GroupModifyProps {
  group: Group | null
  onGroupModifySubmit: (groupModifyData: GroupModifyData) => void
}

function GroupModify({ group, onGroupModifySubmit }: GroupModifyProps) {
  const userInfo = useSelector((state: RootState) => state.user.userInfo.data)

  const [groupModifyInput, setGroupModifyInput] = useState({
    userEmail: userInfo ? userInfo.email : '',
    teamId: group ? group.teamSeq : 0,
    name: group ? group.name : '',
  })

  useEffect(() => {
    setGroupModifyInput({
      userEmail: userInfo ? userInfo.email : '',
      teamId: group ? group.teamSeq : 0,
      name: group ? group.name : '',
    })
  }, [userInfo, group])

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupModifyInput({ ...groupModifyInput, name: e.target.value })
  }

  const onSubmitModifyGroupInfo = () => {
    if (groupModifyInput.name === '') {
      alert('팀 이름을 입력해주세요.')
    } else {
      onGroupModifySubmit(groupModifyInput)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minWidth: '600px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '40px',
          justifyContent: 'end',
          alignItems: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        <div>그룹명 : </div>
      </Box>
      <Box
        component="form"
        sx={{
          display: 'flex',
          width: '18%',
          minWidth: '300px',
          p: '1vh',
        }}
        onSubmit={onSubmitModifyGroupInfo}
      >
        <TextField
          required
          fullWidth
          size="small"
          id="email"
          variant="outlined"
          onChange={onChangeName}
          value={groupModifyInput.name}
          color="success"
          sx={{ background: 'white', mr: '0.5vw' }}
          inputProps={{ maxLength: 15 }}
        />
        <Button
          sx={{
            height: '38px',
            textAlign: 'center',
            fontSize: '16px',
            fontFamily: 'MapoPeacefull, moneyRoundWindRegular',
            background: (theme) => theme.colors.greenButton,
          }}
          variant="contained"
          type="submit"
          color="success"
        >
          변경
        </Button>
      </Box>
    </Box>
  )
}

export default GroupModify
