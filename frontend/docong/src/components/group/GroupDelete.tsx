import { Button } from '@mui/material'

interface GroupDeleteProps {
  group: any
  openGroupDeleteForm: () => void
}

function GroupDelete({ group, openGroupDeleteForm }: GroupDeleteProps) {
  return (
    <Button
      sx={{
        fontSize: '16px',
        fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
        color: (theme) => theme.colors.pageBg,
        background: '#fa5252',
        borderRadius: '8px',
      }}
      onClick={openGroupDeleteForm}
      variant="contained"
      color="error"
    >
      그룹 삭제
    </Button>
  )
}

export default GroupDelete
