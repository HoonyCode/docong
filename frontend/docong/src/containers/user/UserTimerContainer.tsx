import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserTimerControls from '../../components/user/UserTimerControls'
import UserTimerDisplay from '../../components/user/UserTimerDisplay'
import UserTimerType from '../../components/user/UserTimerType'
import { RootState } from '../../modules'
import {
  changeUserTimerStatus,
  changeUserTimerType,
  startUserTimer,
  stopUserTimer,
} from '../../modules/user'
import './UserTimerContainer.css'

function UserTimerContainer() {
  const { selectedType, status, time } = useSelector(
    (state: RootState) => state.user.userTimer
  )

  const dispatch = useDispatch()

  const timerTypes = [
    { name: 'Short', time: 10 },
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
    }
  }, [status, time, dispatch, selectedType])

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
    <div className="Content">
      <div className="Pomodoro">
        <UserTimerType
          types={timerTypes}
          selected={selectedType}
          changeType={changeType}
        />
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
  )
}

export default UserTimerContainer
