import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

interface GroupSlackFormProps {
    isOpenGroupSlackForm: boolean
    closeGroupSlackForm: () => void
    onGroupSlackSubmit: () => void
}

function GroupSlackForm({
    isOpenGroupSlackForm,
    closeGroupSlackForm,
    onGroupSlackSubmit
}: GroupSlackFormProps) {

    const [slackInfoInput, setSlackInfoInput] = useState({
        apiToken: '',
        channelName: ''
    })

    const onChangeSlackAPIToken = (e: ChangeEvent<HTMLInputElement>) => {
        setSlackInfoInput({ ...slackInfoInput, apiToken: e.target.value })
    }

    const onChangeSlackChannelName = (e: ChangeEvent<HTMLInputElement>) => {
        setSlackInfoInput({ ...slackInfoInput, channelName: e.target.value })
    }

    return (
        <>
            <Dialog open={isOpenGroupSlackForm} onClose={closeGroupSlackForm}>
                <DialogTitle>Slack Setting</DialogTitle>
                <Box component="form" onSubmit={onGroupSlackSubmit}>
                    <DialogContent
                        sx={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            p: '28px',
                            pb: '4px',
                            color: (theme) => theme.colors.greenText,
                        }}>
                        <Grid container>
                            <Grid item xs={5}>
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
                                    <div>Slack API Token</div>
                                </Box>
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
                                    <div>Slack Channel Name</div>
                                </Box>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    variant="outlined"
                                    onChange={onChangeSlackAPIToken}
                                    value={slackInfoInput.apiToken}
                                    color="success"
                                    sx={{ mb: '14px' }}
                                    inputProps={{ maxLength: 15 }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    variant="outlined"
                                    onChange={onChangeSlackChannelName}
                                    value={slackInfoInput.channelName}
                                    color="success"
                                    sx={{ mb: '14px' }}
                                    inputProps={{ maxLength: 15 }}
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
                            연동하기
                        </Button>
                        <Button
                            sx={{
                                width: '22%',
                                fontSize: '16px',
                                color: (theme) => theme.colors.pageBg,
                                background: (theme) => theme.colors.gray,
                                borderRadius: '8px',
                            }}
                            onClick={closeGroupSlackForm}
                            variant="contained"
                            color="success"
                        >
                            취소
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default GroupSlackForm