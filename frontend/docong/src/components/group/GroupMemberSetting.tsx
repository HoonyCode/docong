import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { styled } from '@mui/system'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Group,
  GroupMemberModifyData,
  GroupMemberModifyData2,
  MemberData,
} from '../../api/group'
import { RootState } from '../../modules'
import produce from 'immer'
import GroupSlack from './GroupSlack'
import GroupSlackForm from './GroupSlackForm'

interface GroupMemberSettingProps {
  group: any
  onAddGroupMemberSubmit: (groupMemberModifyData: GroupMemberModifyData) => void
  onMemberDeleteByLeaderSubmit: (
    groupMemberModifyData: GroupMemberModifyData2
  ) => void
}

function GroupMemberSetting({
  group,
  onAddGroupMemberSubmit,
  onMemberDeleteByLeaderSubmit,
}: GroupMemberSettingProps) {
  const userInfo = useSelector((state: RootState) => state.user.userInfo.data)

  const [isOpenGroupSlackForm, setIsOpenGroupSlackForm] = useState(false)

  const [addMemberInfo, setAddMemberInfo] = useState({
    teamId: group ? group.teamSeq : 0,
    userEmail: '',
  })

  const [userList, setUserList] = useState({
    users: [],
  })

  useEffect(() => {
    if (group !== null) {
      const user = group.userList.map((memberData: MemberData) => ({
        email: memberData.email,
        name: memberData.name,
      }))
      setUserList(
        produce((draft) => {
          draft.users = user
        })
      )
    }
  }, [group])

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: '#455A47',
      fontSize: 20,
      fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }))
  const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
    fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: '#455A47',
      fontSize: 20,
      fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.common.white,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  const onAddMemberSubmit = () => {
    onAddGroupMemberSubmit(addMemberInfo)
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setAddMemberInfo({ teamId: group.teamSeq, userEmail: e.target.value })
  }

  const onDeleteMember = (
    e: React.MouseEvent<HTMLButtonElement>,
    user_email: string
  ) => {
    onMemberDeleteByLeaderSubmit({
      team_id: group.teamSeq,
      user_email: user_email,
    })
  }

  const openGroupSlackForm = () => {
    setIsOpenGroupSlackForm(true)
  }

  const closeGroupSlackForm = () => {
    setIsOpenGroupSlackForm(false)
  }

  const onGroupSlackSubmit = () => {
    alert('서비스 준비중입니다.')
  }

  return (
    <Box
      sx={{
        border: 1,
        borderRadius: 4,
        borderColor: 'gray',
        width: '100%',
        px: 2,
        my: '26px',
        textAlign: 'center',
      }}
    >
      <h1>그룹원 목록</h1>
      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          maxHeight: '400px',
          overflow: 'overlay',
          mb: '26px',
          '::-webkit-scrollbar': {
            width: '0px',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#8a9788',
            borderRadius: '8px',
            backgroundClip: 'padding-box',
            border: '1px solid transparent',
          },
          '::-webkit-scrollbar-track': {
            backgroundColor: '#c4c4c4',
            borderRadius: '8px',
            boxShadow: 'inset 0px 0px 5px white',
          },
          '&:hover': {
            '::-webkit-scrollbar': {
              width: '8px',
            },
          },
        }}
      >
        <Table sx={{ width: '100%' }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">이름</StyledTableCell>
              <StyledTableCell align="center">이메일</StyledTableCell>
              {userInfo !== null &&
                group !== null &&
                userInfo.email === group.leaderEmail && (
                  <StyledTableCell2 align="center">삭제</StyledTableCell2>
                )}
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.users.map((user: any, index: number) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{user.name}</StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                {userInfo !== null &&
                  group !== null &&
                  userInfo.email === group.leaderEmail && (
                    <StyledTableCell align="center">
                      {group.leaderEmail !== user.email && (
                        <Button
                          sx={{
                            fontSize: '16px',
                            fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                            color: '#f03e3e',
                          }}
                          onClick={(e) => {
                            onDeleteMember(e, user.email)
                          }}
                        >
                          내보내기
                        </Button>
                      )}
                    </StyledTableCell>
                  )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {userInfo !== null &&
        group !== null &&
        userInfo.email === group.leaderEmail && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                my: '20px',
              }}
            >
              <GroupSlack openGroupSlackForm={openGroupSlackForm} />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    mr: '10px',
                  }}
                >
                  그룹원 추가
                </Box>
                <Box
                  component="form"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onSubmit={onAddMemberSubmit}
                >
                  <TextField
                    required
                    fullWidth
                    size="small"
                    id="email"
                    variant="outlined"
                    onChange={onChangeEmail}
                    value={addMemberInfo.userEmail}
                    color="success"
                    sx={{ background: 'white', mr: '10px' }}
                  />
                  <Button
                    sx={{
                      height: '38px',
                      justifyContent: 'end',
                      fontSize: '16px',
                      fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                      background: (theme) => theme.colors.greenButton,
                    }}
                    variant="contained"
                    type="submit"
                    color="success"
                  >
                    추가
                  </Button>
                </Box>
              </Box>
            </Box>
            <GroupSlackForm
              isOpenGroupSlackForm={isOpenGroupSlackForm}
              closeGroupSlackForm={closeGroupSlackForm}
              onGroupSlackSubmit={onGroupSlackSubmit}
            />
          </>
        )}
    </Box>
  )
}

export default GroupMemberSetting
