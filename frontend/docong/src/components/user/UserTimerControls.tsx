import React, { memo } from 'react'
import './UserTimerControls.scss'

interface UserTimerControlsProps {
  start: any
  reset: any
  pause: any
  status: any
}

function UserTimerControls({
  start,
  reset,
  pause,
  status,
}: UserTimerControlsProps) {
  return (
    <div className="Controls">
      {!status && (
        <button onClick={start} className="start">
          Start Timer
        </button>
      )}

      {status === 'Finished' && (
        <button onClick={start} className="start">
          Start Timer
        </button>
      )}

      {(status === 'Paused' || status === 'Running') && (
        <button onClick={reset} className="pause">
          Stop Timer
        </button>
      )}
    </div>
  )
}

export default memo(UserTimerControls)
