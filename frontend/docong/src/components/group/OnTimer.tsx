import { Avatar, Box, Button, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import { OnOffUser, OnOffUserList } from '../../api/group'
import OnTimerDetail from './OnTimerDetail'
import produce from 'immer'

interface OnTimerProps {
  userList: OnOffUserList | null
  getUserList: () => void
}

function OnTimer({ userList, getUserList }: OnTimerProps) {

  const [userState, setUserState] = useState({
    columns: [
      {
        id: 0,
        title: 'onTimer',
        users: [{
          name: '',
          email: '',
          img: ''
        }],
      },
      {
        id: 1,
        title: 'other',
        users: [{
          name: '',
          email: '',
          img: ''
        }],
      },
    ],
  })

  useEffect(() => {
    if(userList !== null) {
      const onTimer = userList
      .filter((user: OnOffUser) => user.online === true)
      .map((user: OnOffUser) => ({
        name: user.userName,
        email: user.userEmail,
        img: user.userImg
      }))
      const other = userList
      .filter((user: OnOffUser) => user.online !== true)
      .map((user: OnOffUser) => ({
        name: user.userName,
        email: user.userEmail,
        img: user.userImg
      }))
      setUserState(
        produce((draft) => {
          draft.columns[0].users = onTimer
          draft.columns[1].users = other
        })
      )
    }
  }, [userList])
  
  return (
    <Box
      sx={{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {userState.columns[0].users
          .map((user: {name: string, email: string, img: string}) => (
            <Tooltip title={`${user.name} (${user.email})`}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  m: 0.5,
                  flexDirection: 'column',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'end',
                }}
                alt={`${user.name}`}
                src={
                  user.img ? user.img : '/images/Profile_Default.png'
                }
              />
            </Tooltip>
          ))}
      <OnTimerDetail userState={userState} getUserList={getUserList} />
    </Box>
  )
}

export default OnTimer
