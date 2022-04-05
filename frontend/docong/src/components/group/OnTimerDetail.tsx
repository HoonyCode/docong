import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { OnOffUser, OnOffUserList } from '../../api/group'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'

interface OnTimerDetailProps {
  userList: OnOffUserList | null
  getUserList: () => void
}

function OnTimerDetail({ userList, getUserList }: OnTimerDetailProps) {
  const [state, setState] = useState(false)

  useEffect(() => {
    getUserList()
  }, [state])

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setState(open)
    }

  const list = () => (
    <Box
      sx={{ mx: 3, my: 15, width: 350 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <h1>On Timer</h1>
      <List>
        {userList !== null &&
          userList
            .filter((user: OnOffUser) => user.online === true)
            .map((user: OnOffUser, index: number) => (
              <ListItem key={index}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    mr: '16px',
                    flexDirection: 'column',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'end',
                    boxShadow: 3,
                  }}
                  alt={`${user.userName}`}
                  src={
                    user.userImg ? user.userImg : '/images/Profile_Default.png'
                  }
                />
                <ListItemText
                  primary={`${user.userName}`}
                  primaryTypographyProps={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                    color: (theme) => theme.colors.greenText,
                  }}
                />
              </ListItem>
            ))}
      </List>
      <Divider sx={{ my: '20px' }} />
      <h1>Other</h1>
      <List>
        {userList !== null &&
          userList
            .filter((user: OnOffUser) => user.online !== true)
            .map((user: OnOffUser, index: number) => (
              <ListItem button key={index}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    mr: '16px',
                    flexDirection: 'column',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'end',
                    boxShadow: 3,
                  }}
                  alt={`${user.userName}`}
                  src={
                    user.userImg ? user.userImg : '/images/Profile_Default.png'
                  }
                />
                <ListItemText
                  primary={`${user.userName}`}
                  primaryTypographyProps={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                    color: (theme) => theme.colors.greenText,
                  }}
                />
              </ListItem>
            ))}
      </List>
      <Divider sx={{ my: '20px' }} />
    </Box>
  )

  return (
    <Box>
      <Fragment key={'right'}>
        <IconButton onClick={toggleDrawer(true)}>
          <MoreHorizRoundedIcon />
        </IconButton>
        <Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </Fragment>
    </Box>
  )
}

export default OnTimerDetail
