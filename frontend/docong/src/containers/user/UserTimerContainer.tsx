import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Tooltip,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserTimerControls from '../../components/user/UserTimerControls'
import UserTimerDisplay from '../../components/user/UserTimerDisplay'
import UserTimerType from '../../components/user/UserTimerType'
import { RootState } from '../../modules'
import {
  changeUserTimerStatus,
  changeUserTimerTime,
  changeUserTimerTodo,
  changeUserTimerType,
  savePomoAsync,
  startUserTimer,
  stopUserTimer,
} from '../../modules/user'
import { darken, lighten } from 'polished'
import { usePrompt } from './Blocker'
import { TransitionProps } from '@mui/material/transitions'
import CircleIcon from '@mui/icons-material/Circle'
import { changeTodoActivateAsync } from '../../modules/todo'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

function UserTimerContainer() {
  const { selectedType, selectedTodo, status, time } = useSelector(
    (state: RootState) => state.user.userTimer
  )
  const [localStatus, setLocalStatus] = useState(false)
  const [openStopDialog, setOpenStopDialog] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const timerTypes = [
    { index: 0, name: 'Short', time: 900 },
    { index: 1, name: 'Basic', time: 1500 },
    { index: 2, name: 'Long', time: 3000 },
  ]

  useEffect(() => {
    Notification.requestPermission().then(function (permission) {})
    if (status === 'play') {
      if (!localStatus) {
        dispatch(changeUserTimerStatus('stop'))
        dispatch(changeUserTimerTime(selectedType.time))
        if (selectedTodo) {
          changeTodoActivate(false)
        }
      }
    }
  }, [status, localStatus, dispatch, selectedType, selectedTodo])

  useEffect(() => {
    return () => {
      if (status == 'play') {
        dispatch(changeUserTimerStatus('stop'))
        dispatch(changeUserTimerTime(selectedType.time))
        if (selectedTodo) {
          changeTodoActivate(false)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (status === 'play' && localStatus && time === 0) {
      dispatch(stopUserTimer())
      try {
        Notification.requestPermission(function (result) {
          if (result === 'granted') {
            navigator.serviceWorker.ready.then((sw) => {
              sw.showNotification(`${selectedType.name} finished!`)
            })
          }
        })
      } catch (e) {
        console.error('Notification error', e)
      }
      let start_date = new Date()
      let end_date = new Date()
      start_date.setSeconds(
        start_date.getSeconds() -
          selectedType.time -
          start_date.getTimezoneOffset() * 60
      )
      end_date.setSeconds(
        end_date.getSeconds() - end_date.getTimezoneOffset() * 60
      )
      let todo_seq = null
      if (selectedTodo) {
        todo_seq = selectedTodo.seq
      }
      // noise 적용 후 수정
      dispatch(
        savePomoAsync.request({
          otherTime: 0,
          endTime: end_date.toISOString(),
          noise: 'COMMON',
          startTime: start_date.toISOString(),
          timeStatus: selectedType.name.toUpperCase(),
          todo_seq: todo_seq,
        })
      )
      if (selectedTodo) {
        changeTodoActivate(false)
      }
    } else if (status === 'stop') {
      dispatch(stopUserTimer())
    }
  }, [status, localStatus, time, dispatch, selectedType, selectedTodo])

  usePrompt(
    'Timer 진행 중 이동하면 Timer 가 정지될 수 있습니다.',
    status === 'play'
  )

  const onClickToTodos = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (status === 'play') {
      alert('타이머 진행중에는 선택할 수 없습니다.')
    } else {
      navigate('/user/todo')
    }
  }

  const changeType = (type: any) => {
    dispatch(
      changeUserTimerType({
        selectedType: type,
        time: type.time,
      })
    )
  }

  const stopInterval = () => {
    setOpenStopDialog(false)
    dispatch(stopUserTimer())
    if (selectedTodo) {
      changeTodoActivate(false)
    }
    setLocalStatus(false)
  }

  const changeTodoActivate = (activate: boolean) => {
    dispatch(
      changeTodoActivateAsync.request({
        todoId: selectedTodo.seq,
        activateData: { activate: activate },
      })
    )
  }

  const startTimer = () => {
    dispatch(changeUserTimerStatus('play'))
    dispatch(startUserTimer())
    if (selectedTodo) {
      changeTodoActivate(true)
    }
    setLocalStatus(true)
  }

  const resetTimer = () => {
    setOpenStopDialog(true)
  }

  const onCloseStopDialog = () => {
    setOpenStopDialog(false)
  }

  const getStatus = () => {
    if (status === 'play') return 'Running'
  }

  const getProgress = () => {
    const current = time
    const total = selectedType.time
    return ((total - current) / total) * 100
  }

  const handleCardRemove = () => {
    dispatch(changeUserTimerTodo(null))
  }

  const congRender = () => {
    let congs = []
    if (selectedTodo) {
      for (let i = 0; i < Math.floor(selectedTodo.realPomo / 2); i++) {
        congs.push(
          <CircleIcon
            key={i}
            sx={{
              width: '45px',
              height: '45px',
              color: (theme) => theme.colors.greenText,
              mr: '10px',
              mb: '10px',
            }}
          />
        )
      }
      for (
        let i = Math.floor(selectedTodo.realPomo / 2);
        i < Math.ceil(selectedTodo.realPomo / 2);
        i++
      ) {
        congs.push(
          <CircleIcon
            key={i}
            sx={{
              width: '45px',
              height: '45px',
              color: (theme) => `${lighten(0.3, theme.colors.greenText)}`,
              mr: '10px',
              mb: '10px',
            }}
          />
        )
      }
      const leftPomo =
        selectedTodo.predictedPomo - Math.ceil(selectedTodo.realPomo / 2)
      if (leftPomo >= 1) {
        for (
          let i = selectedTodo.realPomo;
          i < selectedTodo.realPomo + leftPomo;
          i++
        ) {
          if (congs.length >= 12) {
            break
          } else {
            congs.push(
              <CircleIcon
                key={i}
                sx={{
                  width: '45px',
                  height: '45px',
                  color: (theme) => `${lighten(0.6, theme.colors.greenText)}`,
                  mr: '10px',
                  mb: '10px',
                }}
              />
            )
          }
        }
      }
      return congs
    }
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
          height: '10%',
          '@media (min-height: 850px)': {
            mb: '8vh',
          },
        }}
      >
        {status !== 'play' && (
          <UserTimerType
            types={timerTypes}
            selected={selectedType}
            changeType={changeType}
          />
        )}
      </Box>
      <Grid
        container
        sx={{
          pt: '5vh',
          '@media (min-height: 750px)': {
            pb: '5vh',
          },
        }}
      >
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <UserTimerDisplay
            time={time}
            status={getStatus()}
            progress={getProgress()}
            type={selectedType}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '75%',
              minWidth: '300px',
              height: '380px',
              textAlign: 'start',
            }}
          >
            <Box
              sx={{
                fontSize: '30px',
                fontWeight: 'bold',
                color: (theme) => theme.colors.greenText,
                mb: '14px',
              }}
            >
              <div>To Do</div>
            </Box>
            <Box sx={{ minHeight: '150px', mb: '10px' }}>
              {selectedTodo && (
                <Card
                  sx={[
                    {
                      width: '330px',
                      height: '130px',
                      cursor: 'pointer',
                      borderRadius: '12px',
                      mb: '1vh',
                      p: '18px',
                      background: (theme) => theme.colors.todoCard,
                      '&:hover': {
                        background: (theme) =>
                          `${darken(0.1, theme.colors.doCard)}`,
                      },
                      '&:active': {
                        background: (theme) =>
                          `${darken(0.3, theme.colors.doCard)}`,
                      },
                    },
                  ]}
                >
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography
                        sx={{
                          display: 'inline-block',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: (theme) => theme.colors.basicText,
                          width: '280px',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                        gutterBottom
                      >
                        {selectedTodo.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'flex' }}>
                      {status !== 'play' && (
                        <CloseIcon
                          sx={{
                            display: 'block',
                            ml: 'auto',
                            cursor: 'pointer',
                            fontSize: '26px',
                            color: (theme) =>
                              `${darken(0.2, theme.colors.gray)}`,
                          }}
                          onClick={() => handleCardRemove()}
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Box
                    sx={{
                      mb: '10px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: (theme) => theme.colors.lightGreenText,
                    }}
                  >{`${selectedTodo.realPomo / 2} / ${
                    selectedTodo.predictedPomo
                  } 콩`}</Box>
                  <Grid container>
                    <Grid item xs={6}>
                      <Chip
                        sx={{
                          color: (theme) => theme.colors.basicText,
                          fontWeight: 'bold',
                          background: (theme) => theme.colors.badge1,
                        }}
                        label={selectedTodo.workType}
                        color="primary"
                        size="small"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: 'flex', justifyContent: 'end' }}
                    >
                      <Tooltip
                        title={`${selectedTodo.userName} (${selectedTodo.userEmail})`}
                      >
                        <Avatar
                          sx={{ width: 28, height: 28 }}
                          alt={`${selectedTodo.userName} (${selectedTodo.userEmail})`}
                          src={
                            selectedTodo.userImg
                              ? selectedTodo.userImg
                              : '/images/Profile_Default.jpg'
                          }
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Card>
              )}
              {!selectedTodo && (
                <Button
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '330px',
                    height: '130px',
                    borderRadius: '12px',
                    borderStyle: 'dashed',
                    borderWidth: '2px',
                    fontSize: '45px',
                  }}
                  variant="outlined"
                  onClick={onClickToTodos}
                >
                  +
                </Button>
              )}
            </Box>
            <Box
              sx={{
                fontSize: '30px',
                fontWeight: 'bold',
                color: (theme) => theme.colors.greenText,
                mb: '14px',
              }}
            >
              {selectedTodo && (
                <div>
                  Cong ({selectedTodo.realPomo / 2}/{selectedTodo.predictedPomo}
                  )
                </div>
              )}
              {!selectedTodo && <div>Cong</div>}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '330px' }}>
              {congRender()}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: '2vh' }}>
        <UserTimerControls
          start={startTimer}
          reset={resetTimer}
          status={getStatus()}
        />
      </Box>

      <Dialog
        open={openStopDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={onCloseStopDialog}
        aria-describedby="stop-dialog"
      >
        <DialogTitle>{'정말로 타이머를 중지하겠습니까?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="stop-dialog">
            타이머를 중지하면 진행중이던 docong 은 저장되지 않습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={stopInterval}>
            타이머 중지
          </Button>
          <Button variant="outlined" onClick={onCloseStopDialog}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default memo(UserTimerContainer)
