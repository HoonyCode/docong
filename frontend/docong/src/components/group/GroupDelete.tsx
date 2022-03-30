import { Button } from "@mui/material"

interface GroupDeleteProps {
    openGroupDeleteForm: () => void
}

function GroupDelete({ openGroupDeleteForm }: GroupDeleteProps) {

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
            삭제하기
        </Button>
    )
}

export default GroupDelete