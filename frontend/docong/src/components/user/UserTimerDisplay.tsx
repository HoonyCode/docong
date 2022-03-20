import React from 'react'
import './UserTimerDisplay.css'

interface UserTimerDisplayProps {
  time: any
  status: any
  progress: any
}

function UserTimerDisplay({ time, status, progress }: UserTimerDisplayProps) {
  const pad2 = (num: any) => {
    return num > 9 ? num : `0${num}`
  }

  const formatTime = (time: any) => {
    const minutes = pad2(Math.floor(time / 60))
    const seconds = pad2(Math.floor(time % 60))

    return `${minutes}:${seconds}`
  }

  document.title = `(${formatTime(time)}) docong`

  const radius = 150
  const stroke = 5
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="TimeDisplay">
      <svg width="100%" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        <circle
          stroke="#ddd"
          fill="#fff"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#D9534F"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div>
        <h1>{formatTime(time)}</h1>
        <p>{status}</p>
      </div>
    </div>
  )
}

export default UserTimerDisplay
