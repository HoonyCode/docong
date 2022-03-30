import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, SelectChangeEvent, TextField } from '@mui/material'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { JiraData } from '../../api/group'
import { RootState } from '../../modules'

interface GroupJiraSettingFormProps {
    isOpenJiraSettingForm: boolean
    closeJiraSettingForm: () => void
    onJiraSettingSubmit: (jiraData: JiraData) => void
}

function GroupJiraSettingForm({
    isOpenJiraSettingForm,
    closeJiraSettingForm,
    onJiraSettingSubmit
}: GroupJiraSettingFormProps) {
    const groupInfo = useSelector((state: RootState) => state.group.groups.data) // filter(team_seq==props)

    const [jiraInfoInput, setJiraInfoInput] = useState({
        jiraAPIToken: groupInfo ? groupInfo.jiraApiToken : '',
        jiraDomain: groupInfo ? groupInfo.jiraDomain : '',
        jiraProjectKey: groupInfo ? groupInfo.jiraProjectKey : '',
        jiraUserId: groupInfo ? groupInfo.jiraUserId : '',
    })

    useEffect(() => {
        if (isOpenJiraSettingForm === true) {
            setJiraInfoInput({
                jiraAPIToken: groupInfo ? groupInfo.jiraApiToken : '',
                jiraDomain: groupInfo ? groupInfo.jiraDomain : '',
                jiraProjectKey: groupInfo ? groupInfo.jiraProjectKey : '',
                jiraUserId: groupInfo ? groupInfo.jiraUserId : '',
            })
        }
    }, [isOpenJiraSettingForm, groupInfo])

    const onChangeJiraApiToken = (e: ChangeEvent<HTMLInputElement>) => {
        setJiraInfoInput({ ...jiraInfoInput, jiraAPIToken: e.target.value })
    }

    const onChangeJiraDomain = (e: ChangeEvent<HTMLInputElement>) => {
        setJiraInfoInput({ ...jiraInfoInput, jiraDomain: e.target.value })
    }

    const onChangeJiraProjectKey = (e: ChangeEvent<HTMLInputElement>) => {
        setJiraInfoInput({ ...jiraInfoInput, jiraProjectKey: e.target.value })
    }

    const onChangeJiraUserId = (e: ChangeEvent<HTMLInputElement>) => {
        setJiraInfoInput({ ...jiraInfoInput, jiraUserId: e.target.value })
    }

    const onSubmitSettingJira = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // 모든 칸이 다 채워졌는지 확인하는 코드
        if (jiraInfoInput.jiraAPIToken === '' || jiraInfoInput.jiraDomain === ''
            || jiraInfoInput.jiraProjectKey === '' || jiraInfoInput.jiraUserId === '') {
            alert('빈칸이 존재합니다.')
        } else {
            onJiraSettingSubmit(jiraInfoInput)
            closeJiraSettingForm()
        }
    }

    return (
        <Dialog open={isOpenJiraSettingForm} onClose={closeJiraSettingForm}>
            <DialogTitle>Jira Setting</DialogTitle>
            <Box component="form" onSubmit={onSubmitSettingJira}>
                <DialogContent
                    sx={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        p: '28px',
                        pb: '4px',
                        color: (theme) => theme.colors.greenText,
                    }}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Box sx={{
                                display: 'flex',
                                height: '56px',
                                ml: '10px',
                                mb: '14px',
                                justifyContent: 'start',
                                alignItems: 'center',
                                fontSize: '20px',
                                fontWeight: 'bold',
                            }}>
                                <div>Jira Domain</div>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    height: '56px',
                                    ml: '10px',
                                    mb: '14px',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                <div>Jira User ID</div>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    height: '56px',
                                    ml: '10px',
                                    mb: '14px',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                <div>Jira API Token</div>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    height: '56px',
                                    ml: '10px',
                                    mb: '14px',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                <div>Jira Project Key</div>
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                required
                                fullWidth
                                id="jiraDomain"
                                variant="outlined"
                                onChange={onChangeJiraDomain}
                                value={jiraInfoInput.jiraDomain}
                                color="success"
                                sx={{ mb: '14px' }}
                            />

                            <TextField
                                required
                                fullWidth
                                id="jiraDomain"
                                variant="outlined"
                                onChange={onChangeJiraUserId}
                                value={jiraInfoInput.jiraUserId}
                                color="success"
                                sx={{ mb: '14px' }}
                            />

                            <TextField
                                required
                                fullWidth
                                id="jiraDomain"
                                variant="outlined"
                                onChange={onChangeJiraApiToken}
                                value={jiraInfoInput.jiraAPIToken}
                                color="success"
                                sx={{ mb: '14px' }}
                            />

                            <TextField
                                required
                                fullWidth
                                id="jiraDomain"
                                variant="outlined"
                                onChange={onChangeJiraProjectKey}
                                value={jiraInfoInput.jiraProjectKey}
                                color="success"
                                sx={{ mb: '14px' }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: '0 24px 20px 24px' }}>
                    <Button
                        sx={{
                            width: '22%',
                            fontSize: '16px',
                            color: (theme) => theme.colors.pageBg,
                            background: (theme) => theme.colors.greenButton,
                            borderRadius: '8px',
                            mr: '8px',
                        }}
                        variant="contained"
                        color="success"
                        type="submit"
                    >
                        불러오기
                    </Button>
                    <Button
                        sx={{
                            width: '22%',
                            fontSize: '16px',
                            color: (theme) => theme.colors.pageBg,
                            background: (theme) => theme.colors.gray,
                            borderRadius: '8px',
                        }}
                        onClick={closeJiraSettingForm}
                        variant="contained"
                        color="success"
                    >
                        CANCLE
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export default GroupJiraSettingForm