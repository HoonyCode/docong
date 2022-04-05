import { Box, Button } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import OnTimer from '../../components/group/OnTimer'
import { RootState } from '../../modules'
import { getGroupAllDateAnalysisAsync, getGroupRankingListAsync, getGroupTimeAnalysisAsync, getUserListDataAsync } from '../../modules/group'

function GroupAnalysisContainer() {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const groupSeq = Number(params.groupSeq)
    const userList = useSelector((state: RootState) => state.group.userList.data)
    
    const groupAllDateAnalysis = useSelector((state: RootState) => 
    state.group.groupAllDateAnalysis ? state.group.groupAllDateAnalysis.data : null)

    const rankingList = useSelector((state: RootState) => 
    state.group.rankingList ? state.group.rankingList.data : null)

    const groupTimeAnalysis = useSelector((state:RootState) =>
    state.group.groupTimeAnalysis ? state.group.groupTimeAnalysis.data : null)

    const groupAllDateInput = {
        year: new Date().getFullYear(),
        groupSeq: groupSeq
    }

    useEffect(() => {
        getUserList()
        dispatch(getGroupAllDateAnalysisAsync.request(groupAllDateInput))
        dispatch(getGroupRankingListAsync.request(groupSeq))
        dispatch(getGroupTimeAnalysisAsync.request(groupSeq))
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

    const check = () => {
        console.log("groupAllDateAnalysis->",groupAllDateAnalysis)
        console.log("rankingList->",rankingList)
        console.log("groupTimeAnalysis->",groupTimeAnalysis)
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
            <Button onClick={check}>console</Button>
        </>
    )
}

export default GroupAnalysisContainer