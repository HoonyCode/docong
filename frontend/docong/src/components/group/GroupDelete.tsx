import { Button } from "@mui/material"

interface GroupDeleteProps {
    group: any
    openGroupDeleteForm: () => void
}

function GroupDelete({ group, openGroupDeleteForm }: GroupDeleteProps) {

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

export default GroupDelete