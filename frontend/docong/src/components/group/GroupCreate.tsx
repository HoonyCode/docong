import { Button } from "@mui/material"

interface GroupCreateProps {
    openGroupCreateForm: () => void
}

function GroupCreate({openGroupCreateForm}: GroupCreateProps) {
    return (
        <Button variant="outlined" onClick={openGroupCreateForm}>
            Create Group
        </Button>
    )
}

export default GroupCreate