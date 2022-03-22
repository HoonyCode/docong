import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  Chip,
  Grid,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserTimerControls from '../../components/user/UserTimerControls'
import UserTimerDisplay from '../../components/user/UserTimerDisplay'
import UserTimerType from '../../components/user/UserTimerType'
import { RootState } from '../../modules'
import {
  changeUserTimerStatus,
  changeUserTimerTodo,
  changeUserTimerType,
  savePomoAsync,
  startUserTimer,
  stopUserTimer,
} from '../../modules/user'
import './UserTimerContainer.css'
import { lighten } from 'polished'

function UserTimerContainer() {
  const { selectedType, selectedTodo, status, time } = useSelector(
    (state: RootState) => state.user.userTimer
  )

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const timerTypes = [
    { name: 'Short', time: 5 },
    { name: 'Normal', time: 1500 },
    { name: 'Long', time: 3000 },
  ]

  useEffect(() => {
    Notification.requestPermission()
    if (status === 'play') {
      dispatch(startUserTimer())
    }
  }, [status, dispatch])

  useEffect(() => {
    if (status === 'play' && time === 0) {
      dispatch(stopUserTimer())
      try {
        navigator.serviceWorker.register('service-worker.js').then((sw) => {
          sw.showNotification(`${selectedType.name} finished!`)
        })
      } catch (e) {
        console.log('Notification error', e)
      }
      let start_date = new Date()
      let end_date = new Date()
      start_date.setSeconds(start_date.getSeconds() - selectedType.time)
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
    }
  }, [status, time, dispatch, selectedType, selectedTodo])

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
    resetTimer()
    dispatch(
      changeUserTimerType({
        selectedType: type,
        time: type.time,
      })
    )
  }

  const stopInterval = () => {
    dispatch(stopUserTimer())
  }

  const startTimer = () => {
    dispatch(changeUserTimerStatus('play'))
  }

  const resetTimer = () => {
    stopInterval()
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
    </>
  )
}

export default UserTimerContainer
