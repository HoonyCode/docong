import { Box, Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

function GroupAnalysisContainer() {
    const navigate = useNavigate()
    const params = useParams()
    const groupSeq = Number(params.groupSeq)

    const onClickToGroupTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate(`/group/todo/${groupSeq}`)
    }

    const onClickToGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate(`/group`)
    }

    const onClickToGroupSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigate(`/group/settings/${groupSeq}`)
    }


    return(
        <>
        <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'end',
                    height: '9%',
                }}
            >
                <Button
                    sx={{
                        fontSize: '24px',
                        color: (theme) => theme.colors.greenText,
                        mx: '0.8vw',
                        borderRadius: '0px',
                    }}
                    variant="text"
                    color="success"
                    onClick={onClickToGroup}
                >
                    GROUP
                </Button>
                <Button
                    sx={{
                        fontSize: '24px',
                        color: (theme) => theme.colors.greenText,
                        mx: '0.8vw',
                        borderRadius: '0px',
                    }}
                    variant="text"
                    color="success"
                    onClick={onClickToGroupTodo}
                >
                    BOARD
                </Button>
                <Button
                    sx={{
                        fontSize: '24px',
                        color: (theme) => theme.colors.greenText,
                        mx: '0.8vw',
                        borderBottom: (theme) => `2px solid ${theme.colors.greenText}`,
                        borderRadius: '0px',
                        mb: '2px',
                    }}
                    variant="text"
                    color="success"
                    onClick={(e: any) => e.prebentDefault()}
                >
                    ANALYSIS
                </Button>
                <Button
                    sx={{
                        fontSize: '24px',
                        color: (theme) => theme.colors.greenText,
                        mx: '0.8vw',
                        borderRadius: '0px',
                        mb: '2px',
                    }}
                    variant="text"
                    color="success"
                    onClick={onClickToGroupSettings}
                >
                    SETTING
                </Button>
            </Box>
            <h1>Group Analysis Container</h1>
        </>
    )
}

export default GroupAnalysisContainer