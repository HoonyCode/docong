import { Button } from '@mui/material'

interface GroupSlackProps {
  openGroupSlackForm: () => void
}

function GroupSlack({ openGroupSlackForm }: GroupSlackProps) {
  return (
    <Button
      sx={{
        fontSize: '16px',
        fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
        background: '#9775fa',
      }}
      variant="contained"
      onClick={openGroupSlackForm}
    >
      Slack 연동하기
    </Button>
  )
}

export default GroupSlack
