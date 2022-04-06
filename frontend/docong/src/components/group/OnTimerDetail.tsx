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

interface UserState {
  columns: {
    id: number;
    title: string;
    users: {
      name: string;
      email: string;
      img: string;
    }[];
  }[];
}

interface OnTimerDetailProps {
  userState: UserState
  getUserList: () => void
}

function OnTimerDetail({ userState, getUserList }: OnTimerDetailProps) {
  const [state, setState] = useState(false)

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
        {userState.columns[0].users
          .map((user: { name: string, email: string, img: string }, index: number) => (
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
                alt={`${user.name}`}
                src={
                  user.img ? user.img : '/images/Profile_Default.png'
                }
              />
              <ListItemText
                primary={`${user.name}`}
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
        {userState.columns[1].users
          .map((user: { name: string, email: string, img: string }, index: number) => (
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
                alt={`${user.name}`}
                src={
                  user.img ? user.img : '/images/Profile_Default.png'
                }
              />
              <ListItemText
                primary={`${user.name}`}
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
