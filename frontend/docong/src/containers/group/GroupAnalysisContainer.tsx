import { Box, Button } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import OnTimer from '../../components/group/OnTimer'
import { RootState } from '../../modules'
import { getUserListDataAsync } from '../../modules/group'

function GroupAnalysisContainer() {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const groupSeq = Number(params.groupSeq)
    const userList = useSelector((state: RootState) => state.group.userList.data)
    
    useEffect(() => {
        getUserList()
    }, [])

    const getUserList = () => {
        dispatch(getUserListDataAsync.request(groupSeq))
    }

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
                <OnTimer
                    userList={userList}
                    getUserList={getUserList}
                />
            </Box>
            <h1>Group Analysis Container</h1>
        </>
    )
}

export default GroupAnalysisContainer