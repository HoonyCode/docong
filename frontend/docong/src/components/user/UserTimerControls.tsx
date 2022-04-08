import { Button } from '@mui/material'
import React, { memo } from 'react'

interface UserTimerControlsProps {
  start: any
  reset: any
  status: any
}

function UserTimerControls({ start, reset, status }: UserTimerControlsProps) {
  return (
    <>
      {!status && (
        <Button
          sx={{
            width: '150px',
            height: '50px',
            fontSize: '20px',
            color: (theme) => theme.colors.pageBg,
            background: (theme) => theme.colors.greenButton,
            borderRadius: '8px',
          }}
          variant="contained"
          color="success"
          onClick={start}
        >
          START
        </Button>
      )}
      {status === 'Running' && (
        <Button
          sx={{
            width: '150px',
            height: '50px',
            fontSize: '20px',
            color: (theme) => theme.colors.basicText,
            background: (theme) => theme.colors.gray,
            borderRadius: '8px',
          }}
          variant="contained"
          color="success"
          onClick={reset}
        >
          STOP
        </Button>
      )}
    </>
  )
}

export default memo(UserTimerControls)
