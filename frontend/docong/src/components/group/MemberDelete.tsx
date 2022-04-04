import { Button } from "@mui/material"
import { Group } from "../../api/group"
import { RootState } from "../../modules"

interface MemberDeleteProps {
    openMemberDeleteForm: () => void
}
function MemberDelete({ openMemberDeleteForm }: MemberDeleteProps) {

    return (
        <Button
            sx={{
                width: '22%',
                fontSize: '16px',
                color: (theme) => theme.colors.pageBg,
                background: (theme) => theme.colors.greenButton,
                borderRadius: '8px',
            }}
            onClick={openMemberDeleteForm}
            variant="contained"
            color="success"
        >
            그룹 탈퇴
        </Button>
    )
    
}

export default MemberDelete