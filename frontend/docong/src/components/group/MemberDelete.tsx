import { Button } from '@mui/material'

interface MemberDeleteProps {
  openMemberDeleteForm: () => void
}
function MemberDelete({ openMemberDeleteForm }: MemberDeleteProps) {
  return (
    <Button
      sx={{
        fontSize: '16px',
        fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
        color: (theme) => theme.colors.pageBg,
        background: '#fa5252',
        borderRadius: '8px',
      }}
      onClick={openMemberDeleteForm}
      variant="contained"
      color="error"
    >
      그룹 탈퇴
    </Button>
  )
}

export default MemberDelete
