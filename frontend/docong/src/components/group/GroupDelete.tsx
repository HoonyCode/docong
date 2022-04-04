import { Button } from "@mui/material"
import { useSelector } from "react-redux"
import { RootState } from "../../modules"

interface GroupDeleteProps {
    group: any
    openGroupDeleteForm: () => void
}

function GroupDelete({ group, openGroupDeleteForm }: GroupDeleteProps) {

    const userInfo = useSelector((state: RootState) => state.user.userInfo.data)

    if (userInfo !== null && group !== null && userInfo.email === group.leaderEmail) {
        return (
            <Button
                sx={{
                    width: '22%',
                    fontSize: '16px',
                    color: (theme) => theme.colors.pageBg,
                    background: (theme) => theme.colors.greenButton,
                    borderRadius: '8px',
                }}
                onClick={openGroupDeleteForm}
                variant="contained"
                color="success"
            >
                그룹 삭제
            </Button>
        )
    }
    else{
        return(
            <>
            </>
        )
    }
}

export default GroupDelete