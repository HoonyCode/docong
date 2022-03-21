import { Button } from '@mui/material'

interface UserAnalysisProps {
  openEditUserForm: () => void
}

function UserAnalysis({ openEditUserForm }: UserAnalysisProps) {
  return (
    <Button variant="outlined" onClick={openEditUserForm}>
      EditUser
    </Button>
  )
}
export default UserAnalysis
