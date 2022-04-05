import { Button } from "@mui/material"

interface GroupSlackProps {
    openGroupSlackForm: () => void
}

function GroupSlack ({openGroupSlackForm}: GroupSlackProps) {
    return(
        <Button variant="outlined" onClick={openGroupSlackForm}>
            Slack 연동하기
        </Button>
    )
}

export default GroupSlack