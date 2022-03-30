import { Button } from '@mui/material'

interface GroupJiraSettingProps {
    openJiraSettingForm: () => void
}

function GroupJiraSetting({openJiraSettingForm}: GroupJiraSettingProps) {
    return (
        <Button variant="outlined" onClick={openJiraSettingForm}>
            JIRA
        </Button>
    )
}
export default GroupJiraSetting