import React, { memo } from 'react'
import './UserTimerType.css'

interface UserTimerTypeProps {
  types: any
  changeType: any
  selected: any
}

function UserTimerType({ types, changeType, selected }: UserTimerTypeProps) {
  return (
    <div className="TypeSelect">
      {types.map((type: any, index: number) => (
        <button
          key={type.name}
          onClick={() => changeType(type)}
          className={type.name === selected.name ? 'active' : ''}
        >
          {type.name}
        </button>
      ))}
    </div>
  )
}

export default memo(UserTimerType)
