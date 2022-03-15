import React, { memo } from 'react'
import './UserTimerControls.css'

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
          Restart Timer
        </button>
      )}

      {(status === 'Paused' || status === 'Running') && (
        <div>
          <button onClick={reset} className="reset">
            Stop
          </button>
          <button
            onClick={pause}
            className={status === 'Paused' ? 'resume' : 'pause'}
          >
            {status === 'Paused' ? 'Resume' : 'Pause'}
          </button>
        </div>
      )}
    </div>
  )
}

export default memo(UserTimerControls)
