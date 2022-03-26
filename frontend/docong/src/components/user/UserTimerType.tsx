import { Tab, Tabs } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'

interface UserTimerTypeProps {
  types: any
  changeType: any
  selected: { index: number; name: string; time: number }
}

function UserTimerType({ types, changeType, selected }: UserTimerTypeProps) {
  const [typeIndex, setTypeIndex] = useState(selected.index)

  useEffect(() => {
    if (selected) {
      setTypeIndex(selected.index)
    }
  }, [selected])

  const onChangeType = (e: any, newIndex: number) => {
    changeType(types[newIndex])
  }

  return (
    <Tabs
      value={typeIndex}
      onChange={onChangeType}
      variant="fullWidth"
      textColor="primary"
      indicatorColor="primary"
      aria-label="Timer Type"
    >
      {types.map((type: any, index: number) => (
        <Tab
          sx={{
            mx: '0.5vw',
            color: (theme) => theme.colors.greenText,
            fontSize: '20px',
          }}
          key={index}
          label={type.name}
        />
      ))}
    </Tabs>
  )
}

export default memo(UserTimerType)
