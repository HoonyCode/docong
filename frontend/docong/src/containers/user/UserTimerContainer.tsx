import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserTimerControls from '../../components/user/UserTimerControls'
import UserTimerDisplay from '../../components/user/UserTimerDisplay'
import UserTimerType from '../../components/user/UserTimerType'
import { RootState } from '../../modules'
import {
  changeUserTimerStatus,
  changeUserTimerType,
  savePomoAsync,
  startUserTimer,
  stopUserTimer,
} from '../../modules/user'
import './UserTimerContainer.css'

function UserTimerContainer() {
  const { selectedType, status, time } = useSelector(
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
      dispatch(
        savePomoAsync.request({
          emotion: '',
          endTime: '2022-03-15T18:30:16.392Z',
          noise: '',
          startTime: '2022-03-15T18:30:16.392Z',
          timeStatus: selectedType.name.toUpperCase(),
          todo_seq: 0,
          user_seq: 3,
        })
      )
    }
  }, [status, time, dispatch, selectedType])

  const onClickToTodos = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate('/todo')
  }

  const onClickLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('persist:root')
    navigate('/login')
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

  return (
    <>
      {status !== 'play' && (
        <Button variant="outlined" onClick={onClickToTodos}>
          Todo
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
        </div>
      </div>
    </>
  )
}

export default UserTimerContainer
