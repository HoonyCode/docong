import {
  Avatar,
  AvatarGroup,
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
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useEffect, useState } from 'react'
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
import './UserTimerContainer.css'
import { lighten } from 'polished'
import { usePrompt } from './Blocker'
import { TransitionProps } from '@mui/material/transitions'

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
    { name: 'Short', time: 900 },
    { name: 'Basic', time: 5 },
    { name: 'Long', time: 3000 },
  ]

  useEffect(() => {
    Notification.requestPermission()
    if (status === 'play') {
      if (!localStatus) {
        dispatch(changeUserTimerStatus('stop'))
        dispatch(changeUserTimerTime(selectedType.time))
      }
    }
  }, [status, localStatus, dispatch, selectedType])

  useEffect(() => {
    if (status === 'play' && localStatus && time === 0) {
      dispatch(stopUserTimer())
      try {
        navigator.serviceWorker.register('./service-worker.js').then((sw) => {
          sw.showNotification(`${selectedType.name} finished!`)
        })
      } catch (e) {
        console.log('Notification error', e)
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
          endTime: start_date.toISOString(),
          noise: 'COMMON',
          startTime: end_date.toISOString(),
          timeStatus: selectedType.name.toUpperCase(),
          todo_seq: todo_seq,
        })
      )
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
    navigate('/user/todo')
  }

  const onClickToUserAnalysis = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/user/analysis')
  }

  const onClickLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('persist:root')
    navigate('/')
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
    setLocalStatus(false)
  }

  const startTimer = () => {
    dispatch(changeUserTimerStatus('play'))
    dispatch(startUserTimer())
    setLocalStatus(true)
  }

  const resetTimer = () => {
    setOpenStopDialog(true)
  }

  const onCloseStopDialog = () => {
    setOpenStopDialog(false)
  }

  const pauseTimer = () => {}

  const getStatus = () => {
    if (time === 0) return 'Finished'
    if (status === 'pause') return 'Paused'
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

  return (
    <>
      {status !== 'play' && (
        <Button variant="outlined" onClick={onClickToTodos}>
          Todo
        </Button>
      )}
      {status !== 'play' && (
        <Button variant="outlined" onClick={onClickToUserAnalysis}>
          Analysis
        </Button>
      )}
      {status !== 'play' && (
        <Button variant="outlined" onClick={onClickLogout}>
          Logout
        </Button>
      )}
      <div className="Content">
        <div className="Pomodoro">
          {status !== 'play' && (
            <UserTimerType
              types={timerTypes}
              selected={selectedType}
              changeType={changeType}
            />
          )}
          <UserTimerDisplay
            time={time}
            status={getStatus()}
            progress={getProgress()}
          />
          <UserTimerControls
            start={startTimer}
            reset={resetTimer}
            pause={pauseTimer}
            status={getStatus()}
          />
          {selectedTodo && status !== 'play' && (
            <Card
              sx={{
                minWidth: 275,
                p: 1,
                background: `${lighten(0.1, '#BAE691')}`,
                textAlign: 'left',
                m: 1,
              }}
            >
              <Grid container>
                <Grid item xs={10}>
                  <Typography
                    sx={{ display: 'inline-block', fontSize: 16 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {selectedTodo.title}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <CloseIcon
                    sx={{ display: 'block', ml: 'auto', cursor: 'pointer' }}
                    onClick={() => handleCardRemove()}
                  />
                </Grid>
              </Grid>
              <Chip
                sx={{ mb: 1 }}
                label={selectedTodo.workType}
                color="primary"
                size="small"
              />
              <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <AvatarGroup max={4}>
                    <Avatar
                      sx={{ width: 28, height: 28 }}
                      alt="Remy Sharp"
                      src="https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg"
                    />
                    <Avatar
                      sx={{ width: 28, height: 28 }}
                      alt="Travis Howard"
                      src="https://blog.kakaocdn.net/dn/ej7HHN/btqEpJAha97/cSWVSFX8PrV03o15PZ8Bd1/img.jpg"
                    />
                  </AvatarGroup>
                </Grid>
              </Grid>
            </Card>
          )}
          {!selectedTodo && status !== 'play' && (
            <Button variant="contained" onClick={onClickToTodos}>
              Todo 선택하기
            </Button>
          )}
        </div>
      </div>
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

export default UserTimerContainer
