import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Board, { moveCard } from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
import { useDispatch, useSelector } from "react-redux"
import { GroupTodo, GroupTodoInput } from "../../api/groupTodo"
import { RootState } from "../../modules"
import EditIcon from '@mui/icons-material/Edit'
import produce from 'immer'
import { changeUserTimerTodo } from "../../modules/user"
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    SelectChangeEvent,
    Card,
    Typography,
    Chip,
    Avatar,
    Grid,
    DialogContentText,
    InputAdornment,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { darken, lighten } from 'polished'
import TableRowsIcon from '@mui/icons-material/TableRows'
import '../user/UserTodo.scss'
import { modifyJiraInfoAsync } from "../../modules/group"
import { Group } from "../../api/group"
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import CircleIcon from '@mui/icons-material/Circle'

interface GroupTodoProps {
    group: Group | null
    groupSeq: number
    groupTodos: any
    createTodo: (groupTodoInput: GroupTodoInput) => void
    modifyTodo: (todoId: number, groupTodoInput: GroupTodoInput) => void
    deleteTodo: (todoId: any) => void
    modifyTodoStatus: (todoId: number, todoStatus: string) => void
    startTodoTimer: (selectedGroupTodo: GroupTodo) => void
}

function GroupTodoComponent({
    group,
    groupSeq,
    groupTodos,
    createTodo,
    modifyTodo,
    deleteTodo,
    modifyTodoStatus,
    startTodoTimer
}: GroupTodoProps) {
    const [board, setBoard] = useState({
        columns: [
            {
                id: 0,
                title: '투두콩',
                cards: [],
            },
            {
                id: 1,
                title: '두콩',
                cards: [],
            },
            {
                id: 2,
                title: '완두콩',
                cards: [],
            },
        ],
    })

    const userInfo = useSelector((state: RootState) => state.user.userInfo.data)
    const userTimer = useSelector((state: RootState) => state.user.userTimer)

    const [isOpenCreateTodo, setIsOpenCreateTodo] = useState(false)
    const [isOpenModifyTodo, setIsOpenModifyTodo] = useState(false)
    const [selectedDeleteTodo, setSelectedDeleteTodo] = useState(null)
    const [modifyTodoId, setModifyTodoId] = useState(0)
    const [selectedTodo, setSelectedTodo] = useState<null | GroupTodo>(null)
    const [isOpenJiraSettingForm, setIsOpenJiraSettingForm] = useState(false)

    const [groupTodoInput, setGroupTodoInput] = useState({
        title: '',
        content: '',
        predictedPomo: 1,
        teamId: groupSeq,
        userEmail: userInfo ? userInfo.email : '',
        workImportance: '중',
        workProficiency: '중급',
        workType: '기타',
    })

    const [jiraInfoInput, setJiraInfoInput] = useState({
        jiraAPIToken: group ? group.jiraApiToken : '',
        jiraDomain: group ? group.jiraDomain : '',
        jiraProjectKey: group ? group.jiraProjectKey : '',
        jiraUserId: group ? group.jiraUserId : '',
    })

    const dispatch = useDispatch()

    const workTypeColors = [
        '#ffc078',
        '#ffe066',
        '#c0eb75',
        '#8ce99a',
        '#63e6be',
        '#66d9e8',
        '#74c0fc',
        '#91a7ff',
        '#b197fc',
        '#e599f7',
        '#faa2c1',
        '#ffa8a8',
        '#ffd8a8',
        '#ffec99',
        '#d8f5a2',
        '#b2f2bb',
        '#ced4da',
    ]
    const workImportanceList = ['하', '중하', '중', '중상', '상']
    const workProficiencyList = ['초급', '초중급', '중급', '중상급', '상급']
    const workTypeList = [
        '기획',
        '설계',
        '디자인',
        '컨설팅',
        '개발',
        'QA',
        '분석',
        '운영',
        '회계',
        '제작',
        '관리',
        '홍보',
        '인사',
        '문서화',
        '학습',
        '독서',
        '기타',
    ]
    const todoStatus = ['TODO', 'IN_PROGRESS', 'DONE']

    useEffect(() => {
        if (groupTodos !== null) {
            const todo = groupTodos
                .filter((groupTodo: GroupTodo) => groupTodo.status === 'TODO')
                .map((groupTodo: GroupTodo) => ({
                    id: groupTodo.seq,
                    title: groupTodo.title,
                    content: groupTodo.content,
                    workImportance: groupTodo.workImportance,
                    workProficiency: groupTodo.workProficiency,
                    workType: groupTodo.workType,
                    predictedPomo: groupTodo.predictedPomo,
                    realPomo: groupTodo.realPomo,
                    status: groupTodo.status,
                    userName: groupTodo.userName,
                    userEmail: groupTodo.userEmail,
                    userImg: groupTodo.userImg,
                    activate: groupTodo.activate
                }))
            const inProgress = groupTodos
                .filter((groupTodo: GroupTodo) => groupTodo.status === 'IN_PROGRESS')
                .map((groupTodo: GroupTodo) => ({
                    id: groupTodo.seq,
                    title: groupTodo.title,
                    content: groupTodo.content,
                    workImportance: groupTodo.workImportance,
                    workProficiency: groupTodo.workProficiency,
                    workType: groupTodo.workType,
                    predictedPomo: groupTodo.predictedPomo,
                    realPomo: groupTodo.realPomo,
                    status: groupTodo.status,
                    userName: groupTodo.userName,
                    userEmail: groupTodo.userEmail,
                    userImg: groupTodo.userImg,
                    activate: groupTodo.activate
                }))
            const done = groupTodos
                .filter((groupTodo: GroupTodo) => groupTodo.status === 'DONE')
                .map((groupTodo: GroupTodo) => ({
                    id: groupTodo.seq,
                    title: groupTodo.title,
                    content: groupTodo.content,
                    workImportance: groupTodo.workImportance,
                    workProficiency: groupTodo.workProficiency,
                    workType: groupTodo.workType,
                    predictedPomo: groupTodo.predictedPomo,
                    realPomo: groupTodo.realPomo,
                    status: groupTodo.status,
                    userName: groupTodo.userName,
                    userEmail: groupTodo.userEmail,
                    userImg: groupTodo.userImg,
                    activate: groupTodo.activate
                }))
            setBoard(
                produce((draft) => {
                    draft.columns[0].cards = todo
                    draft.columns[1].cards = inProgress
                    draft.columns[2].cards = done
                })
            )
            if (userTimer.selectedTodo) {
                dispatch(
                    changeUserTimerTodo(
                        groupTodos.find(
                            (groupTodo: GroupTodo) => groupTodo.seq === userTimer.selectedTodo.seq
                        )
                    )
                )
            }
        }
    }, [groupTodos])

    useEffect(() => {
        if (isOpenJiraSettingForm === true) {
            setJiraInfoInput({
                jiraAPIToken: group ? group.jiraApiToken : '',
                jiraDomain: group ? group.jiraDomain : '',
                jiraProjectKey: group ? group.jiraProjectKey : '',
                jiraUserId: group ? group.jiraUserId : '',
            })
        }
    }, [isOpenJiraSettingForm, group])

    const setInitialGroupTodoInput = () => {
        setGroupTodoInput({
            title: '',
            content: '',
            predictedPomo: 1,
            teamId: groupSeq,
            userEmail: userInfo ? userInfo.email : '',
            workImportance: '중',
            workProficiency: '중급',
            workType: '',
        })
    }

    const openCreateGroupTodoForm = () => {
        setInitialGroupTodoInput()
        setIsOpenCreateTodo(true)
    }

    const onSelectTodo = (card: any) => {
        if (!selectedTodo) {
            setSelectedTodo({ ...card, seq: card.id })
        } else {
            if (selectedTodo.seq !== card.id) {
                setSelectedTodo({ ...card, seq: card.id })
            } else {
                setSelectedTodo(null)
            }
        }
    }

    const onClickStartTodoTimer = () => {
        if (selectedTodo) {
            if (selectedTodo.status === 'DONE') {
                alert('완료된 콩은 시작할 수 없습니다!')
                setSelectedTodo(null)
            } else {
                startTodoTimer(selectedTodo)
            }
        } else {
            alert('Todo를 먼저 선택해주세요.')
        }
    }

    const openModifyTodoForm = (card: any) => {
        setModifyTodoId(card.id)
        setGroupTodoInput({
            title: card.title,
            content: card.content,
            predictedPomo: card.predictedPomo,
            teamId: groupSeq,
            userEmail: userInfo ? userInfo.email : '',
            workImportance: card.workImportance,
            workProficiency: card.workProficiency,
            workType: card.workType,
        })
        setIsOpenModifyTodo(true)
    }

    const closeCreateTodo = () => {
        setIsOpenCreateTodo(false)
    }

    const closeModifyTodo = () => {
        setIsOpenModifyTodo(false)
    }

    const openJiraSettingForm = () => {
        setIsOpenJiraSettingForm(true)
    }

    const closeJiraSettingForm = () => {
        setIsOpenJiraSettingForm(false)
    }

    const onChangeTodoTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupTodoInput({ ...groupTodoInput, title: e.target.value })
    }

    const onChangeTodoContent = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupTodoInput({ ...groupTodoInput, content: e.target.value })
    }

    const onChangeTodoPredictedPomo = (e: ChangeEvent<HTMLInputElement>) => {
        setGroupTodoInput({ ...groupTodoInput, predictedPomo: Number(e.target.value) })
    }

    const onChangeTodoImportance = (e: SelectChangeEvent<string>) => {
        setGroupTodoInput({ ...groupTodoInput, workImportance: e.target.value })
    }

    const onChangeTodoProficiency = (e: SelectChangeEvent<string>) => {
        setGroupTodoInput({ ...groupTodoInput, workProficiency: e.target.value })
    }

    const onChangeTodoType = (e: SelectChangeEvent<string>) => {
        setGroupTodoInput({ ...groupTodoInput, workType: e.target.value })
    }

    const onSubmitCreateTodo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTodo(groupTodoInput)
        setInitialGroupTodoInput()
        closeCreateTodo()
    }

    const onSubmitModifyTodo = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        modifyTodo(modifyTodoId, groupTodoInput)
        closeModifyTodo()
    }

    const onSubmitSettingJira = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // 모든 칸이 다 채워졌는지 확인하는 코드
        if (jiraInfoInput.jiraAPIToken === '' || jiraInfoInput.jiraDomain === ''
            || jiraInfoInput.jiraProjectKey === '' || jiraInfoInput.jiraUserId === '') {
            alert('빈칸이 존재합니다.')
        } else {
            dispatch(modifyJiraInfoAsync.request({ jiraData: jiraInfoInput, team_id: groupSeq }))
            closeJiraSettingForm()
        }
    }

    const handleCardMove = (card: any, source: any, destination: any) => {
        const updatedBoard = moveCard(board, source, destination)
        setBoard(updatedBoard)
        console.log("status change -> ", card.id)
        modifyTodoStatus(card.id, todoStatus[destination['toColumnId']])
        if (userTimer.selectedTodo) {
            if (todoStatus[destination['toColumnId']] === 'DONE' &&
                userTimer.selectedTodo.seq === card.id) {
                dispatch(changeUserTimerTodo(null))
            }
        }
    }

    const handleCardRemove = (card: any) => {
        setSelectedDeleteTodo(card.id)
    }

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

    return (
        <>
            <Board
                sx={{ flexGrow: 1 }}
                allowRemoveCard
                onCardDragEnd={handleCardMove}
                onCardRemove={handleCardRemove}
                disableColumnDrag
                renderColumnHeader={(column: any) => (
                    <>
                        <Box sx={{ width: '100px' }}></Box>
                        <Box
                            key={column.id}
                            sx={{
                                textAlign: 'center',
                                fontSize: '34px',
                                fontWeight: 'bold',
                                color: (theme) => theme.colors.greenText,
                                mb: '14px',
                            }}
                        >
                            {column.title}
                        </Box>
                        <Box sx={{ width: '100px' }}>
                            {column.id === 0 && (
                                <Tooltip title="Todo 추가">
                                    <Fab
                                        sx={{
                                            color: (theme) => `${darken(0.5, theme.colors.todoCard)}`,
                                            background: (theme) => theme.colors.doCard,
                                            '&:hover': {
                                                background: (theme) =>
                                                    `${darken(0.1, theme.colors.doCard)}`,
                                            },
                                            width: '34px',
                                            height: '34px',
                                            minHeight: '0px',
                                            ml: '10px',
                                            mt: '6px',
                                        }}
                                        aria-label="add"
                                        onClick={openCreateGroupTodoForm}
                                        size="small"
                                    >
                                        <AddIcon />
                                    </Fab>
                                </Tooltip>
                            )}
                        </Box>
                    </>
                )}
                renderCard={(card: any, { dragging }: any) => (
                    <Card
                        key={card.id}
                        sx={[
                            {
                                width: '330px',
                                '@media (max-width: 1660px)': {
                                    width: '290px',
                                },
                                height: '130px',
                                '@media (max-height: 760px)': {
                                    height: '115px',
                                },
                                cursor: 'pointer',
                                borderRadius: '12px',
                                mb: '1vh',
                                p: '18px',
                                background: (theme) => theme.colors.todoCard,
                                '&:hover': {
                                    background: (theme) => `${darken(0.1, theme.colors.doCard)}`,
                                },
                                '&:active': {
                                    background: (theme) => `${darken(0.3, theme.colors.doCard)}`,
                                },
                            },
                            card.id === (selectedTodo ? selectedTodo.seq : null) && {
                                background: (theme) => `${darken(0.1, theme.colors.doCard)}`,
                            },
                        ]}
                        onClick={() => onSelectTodo(card)}
                    >
                        <Grid container>
                            <Grid item xs={10}>
                                <Typography
                                    sx={{
                                        display: 'inline-block',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        color: (theme) => theme.colors.basicText,
                                        width: '250px',
                                        '@media (max-width: 1660px)': {
                                            width: '210px',
                                        },
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        '@media (max-height: 760px)': {
                                            mb: 0,
                                        },
                                    }}
                                    gutterBottom
                                >
                                    {card.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ display: 'flex' }}>
                                <EditIcon
                                    sx={{
                                        display: 'block',
                                        ml: 'auto',
                                        cursor: 'pointer',
                                        fontSize: '26px',
                                        color: (theme) => `${darken(0.2, theme.colors.gray)}`,
                                    }}
                                    onClick={() => openModifyTodoForm(card)}
                                />
                                <CloseIcon
                                    sx={{
                                        display: 'block',
                                        ml: 'auto',
                                        cursor: 'pointer',
                                        fontSize: '26px',
                                        color: (theme) => `${darken(0.2, theme.colors.gray)}`,
                                    }}
                                    onClick={() => handleCardRemove(card)}
                                />
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                mb: '1vh',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: (theme) => theme.colors.lightGreenText,
                            }}
                        >{`${card.realPomo / 2} / ${card.predictedPomo} 콩`}</Box>
                        <Grid container>
                            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Chip
                                    sx={{
                                        color: (theme) => theme.colors.basicText,
                                        fontWeight: 'bold',
                                        background: workTypeColors[workTypeList.indexOf(card.workType)],
                                    }}
                                    label={card.workType}
                                    color="primary"
                                    size="small"
                                />
                                {card.workImportance === '상' && (
                                    <KeyboardDoubleArrowUpIcon
                                        sx={{ fontSize: 26, color: '#FF7452' }}
                                    />
                                )}
                                {card.workImportance === '중상' && (
                                    <KeyboardArrowUpIcon
                                        sx={{ fontSize: 26, color: '#FF7452' }}
                                    />
                                )}
                                {card.workImportance === '중' && (
                                    <DragHandleIcon sx={{ fontSize: 26, color: '#FFAB00' }} />
                                )}
                                {card.workImportance === '중하' && (
                                    <KeyboardArrowDownIcon
                                        sx={{ fontSize: 26, color: '#0065FF' }}
                                    />
                                )}
                                {card.workImportance === '하' && (
                                    <KeyboardDoubleArrowDownIcon
                                        sx={{ fontSize: 26, color: '#0065FF' }}
                                    />
                                )}
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                                <Tooltip title={`${card.userName} (${card.userEmail})`}>
                                    <Avatar
                                        sx={{ width: 28, height: 28 }}
                                        alt={`${card.userName} (${card.userEmail})`}
                                        src={
                                            card.userImg
                                                ? card.userImg
                                                : '/images/Profile_Default.jpg'
                                        }
                                    />
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Card>
                )}
            >
                {board}
            </Board>
            <Box
                sx={{
                    display: 'flex',
                    height: '100px',
                    flexGrow: 1,
                    p: 3,
                    alignItems: 'end',
                }}
            >
                <Button
                    sx={{
                        fontSize: '24px',
                        color: (theme) => theme.colors.lightGreenText,
                    }}
                    variant={'text'}
                    color="success"
                    onClick={onClickStartTodoTimer}
                >
                    <span className={selectedTodo ? 'highlight on' : 'highlight'}>
                        선택한 두콩 시작하기
                    </span>
                </Button>
                {userInfo !== null && group !== null && userInfo.email === group.leaderEmail &&
                    <Button
                        sx={{
                            fontSize: '24px',
                            color: (theme) => theme.colors.lightGreenText,
                        }}
                        variant={'text'}
                        color="success"
                        onClick={openJiraSettingForm}
                    >
                        <span className={selectedTodo ? 'highlight on' : 'highlight'}>
                            JIRA 이슈 불러오기
                        </span>
                    </Button>
                }
            </Box>
            <Dialog open={isOpenCreateTodo} onClose={closeCreateTodo}>
                <DialogTitle
                    sx={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        p: '28px',
                        pb: '4px',
                        color: (theme) => theme.colors.greenText,
                    }}
                >
                    To Do 생성하기
                </DialogTitle>
                <Box component="form" onSubmit={onSubmitCreateTodo}>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={3}>
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
                                    <div>제목</div>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        height: '125px',
                                        pt: '6px',
                                        ml: '10px',
                                        mb: '14px',
                                        justifyContent: 'start',
                                        alignItems: 'start',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <div>내용</div>
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
                                    <div>업무 종류</div>
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
                                    <div>중요도</div>
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
                                    <div>능숙도</div>
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
                                    <div>예상 콩</div>
                                </Box>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    required
                                    fullWidth
                                    id="title"
                                    variant="outlined"
                                    onChange={onChangeTodoTitle}
                                    value={groupTodoInput.title}
                                    color="success"
                                    sx={{ mb: '14px' }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="content"
                                    variant="outlined"
                                    onChange={onChangeTodoContent}
                                    value={groupTodoInput.content}
                                    color="success"
                                    sx={{ mb: '14px' }}
                                />
                                <Select
                                    required
                                    fullWidth
                                    id="work-type"
                                    value={groupTodoInput.workType}
                                    onChange={onChangeTodoType}
                                    color="success"
                                    sx={{ mb: '14px' }}
                                >
                                    {workTypeList.map((workType, index) => (
                                        <MenuItem key={index} value={workType}>
                                            <Chip
                                                sx={{
                                                    color: (theme) => theme.colors.basicText,
                                                    fontWeight: 'bold',
                                                    background: workTypeColors[index],
                                                }}
                                                label={workType}
                                                color="primary"
                                                size="small"
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Select
                                    required
                                    fullWidth
                                    id="work-importance"
                                    value={groupTodoInput.workImportance}
                                    onChange={onChangeTodoImportance}
                                    color="success"
                                    sx={{
                                        mb: '14px',
                                        '> div': {
                                            display: 'flex',
                                            alignItems: 'center',
                                        },
                                    }}
                                >
                                    {workImportanceList.map((workImportance, index) => (
                                        <MenuItem key={index} value={workImportance}>
                                            {workImportance === '상' && (
                                                <KeyboardDoubleArrowUpIcon
                                                    sx={{ fontSize: 22, color: '#FF7452' }}
                                                />
                                            )}
                                            {workImportance === '중상' && (
                                                <KeyboardArrowUpIcon
                                                    sx={{ fontSize: 22, color: '#FF7452' }}
                                                />
                                            )}
                                            {workImportance === '중' && (
                                                <DragHandleIcon
                                                    sx={{ fontSize: 22, color: '#FFAB00' }}
                                                />
                                            )}
                                            {workImportance === '중하' && (
                                                <KeyboardArrowDownIcon
                                                    sx={{ fontSize: 22, color: '#0065FF' }}
                                                />
                                            )}
                                            {workImportance === '하' && (
                                                <KeyboardDoubleArrowDownIcon
                                                    sx={{ fontSize: 22, color: '#0065FF' }}
                                                />
                                            )}
                                            {workImportance}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Select
                                    required
                                    fullWidth
                                    id="work-proficiency"
                                    value={groupTodoInput.workProficiency}
                                    onChange={onChangeTodoProficiency}
                                    color="success"
                                    sx={{ mb: '14px' }}
                                >
                                    {workProficiencyList.map((workProficiency, index) => (
                                        <MenuItem key={index} value={workProficiency}>
                                            {workProficiency}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 12,
                                            min: 1,
                                        },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CircleIcon
                                                    sx={{
                                                        width: '20px',
                                                        height: '20px',
                                                        color: (theme) =>
                                                            `${lighten(0.1, theme.colors.greenText)}`,
                                                        mr: '4px',
                                                    }}
                                                />
                                                <CloseIcon
                                                    sx={{
                                                        width: '18px',
                                                        height: '18px',
                                                        color: (theme) =>
                                                            `${lighten(0.3, theme.colors.greenText)}`,
                                                    }}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={onChangeTodoPredictedPomo}
                                    value={groupTodoInput.predictedPomo}
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
                            생성하기
                        </Button>
                        <Button
                            sx={{
                                width: '22%',
                                fontSize: '16px',
                                color: (theme) => theme.colors.pageBg,
                                background: (theme) => theme.colors.gray,
                                borderRadius: '8px',
                            }}
                            onClick={closeCreateTodo}
                            variant="contained"
                            color="success"
                        >
                            취소
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <Dialog open={isOpenModifyTodo} onClose={closeModifyTodo}>
                <DialogTitle
                    sx={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        p: '28px',
                        pb: '4px',
                        color: (theme) => theme.colors.greenText,
                    }}
                >
                    To Do 수정하기
                </DialogTitle>
                <Box component="form" onSubmit={onSubmitModifyTodo}>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={3}>
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
                                    <div>제목</div>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        height: '125px',
                                        pt: '6px',
                                        ml: '10px',
                                        mb: '14px',
                                        justifyContent: 'start',
                                        alignItems: 'start',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <div>내용</div>
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
                                    <div>업무 종류</div>
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
                                    <div>중요도</div>
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
                                    <div>능숙도</div>
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
                                    <div>예상 콩</div>
                                </Box>
                            </Grid>
                            <Grid item xs={9}>
                                <TextField
                                    required
                                    fullWidth
                                    id="title"
                                    variant="outlined"
                                    onChange={onChangeTodoTitle}
                                    value={groupTodoInput.title}
                                    color="success"
                                    sx={{ mb: '14px' }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="content"
                                    variant="outlined"
                                    onChange={onChangeTodoContent}
                                    value={groupTodoInput.content}
                                    color="success"
                                    sx={{ mb: '14px' }}
                                />
                                <Select
                                    required
                                    fullWidth
                                    id="work-type"
                                    value={groupTodoInput.workType}
                                    onChange={onChangeTodoType}
                                    color="success"
                                    sx={{ mb: '14px' }}
                                >
                                    {workTypeList.map((workType, index) => (
                                        <MenuItem key={index} value={workType}>
                                            <Chip
                                                sx={{
                                                    color: (theme) => theme.colors.basicText,
                                                    fontWeight: 'bold',
                                                    background: workTypeColors[index],
                                                }}
                                                label={workType}
                                                color="primary"
                                                size="small"
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                                <Select
                                    required
                                    fullWidth
                                    id="work-importance"
                                    value={groupTodoInput.workImportance}
                                    onChange={onChangeTodoImportance}
                                    color="success"
                                    sx={{
                                        mb: '14px',
                                        '> div': {
                                            display: 'flex',
                                            alignItems: 'center',
                                        },
                                    }}
                                >
                                    {workImportanceList.map((workImportance, index) => (
                                        <MenuItem key={index} value={workImportance}>
                                        {workImportance === '상' && (
                                          <KeyboardDoubleArrowUpIcon
                                            sx={{ fontSize: 22, color: '#FF7452' }}
                                          />
                                        )}
                                        {workImportance === '중상' && (
                                          <KeyboardArrowUpIcon
                                            sx={{ fontSize: 22, color: '#FF7452' }}
                                          />
                                        )}
                                        {workImportance === '중' && (
                                          <DragHandleIcon
                                            sx={{ fontSize: 22, color: '#FFAB00' }}
                                          />
                                        )}
                                        {workImportance === '중하' && (
                                          <KeyboardArrowDownIcon
                                            sx={{ fontSize: 22, color: '#0065FF' }}
                                          />
                                        )}
                                        {workImportance === '하' && (
                                          <KeyboardDoubleArrowDownIcon
                                            sx={{ fontSize: 22, color: '#0065FF' }}
                                          />
                                        )}
                                        {workImportance}
                                      </MenuItem>
                                    ))}
                                </Select>
                                <Select
                                    required
                                    fullWidth
                                    id="work-proficiency"
                                    value={groupTodoInput.workProficiency}
                                    onChange={onChangeTodoProficiency}
                                    color="success"
                                    sx={{ mb: '14px' }}
                                >
                                    {workProficiencyList.map((workProficiency, index) => (
                                        <MenuItem key={index} value={workProficiency}>
                                            {workProficiency}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    InputProps={{
                                        inputProps: {
                                            max: 12,
                                            min: 1,
                                        },
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <CircleIcon
                                              sx={{
                                                width: '20px',
                                                height: '20px',
                                                color: (theme) =>
                                                  `${lighten(0.1, theme.colors.greenText)}`,
                                                mr: '4px',
                                              }}
                                            />
                                            <CloseIcon
                                              sx={{
                                                width: '18px',
                                                height: '18px',
                                                color: (theme) =>
                                                  `${lighten(0.3, theme.colors.greenText)}`,
                                              }}
                                            />
                                          </InputAdornment>
                                        ),
                                    }}
                                    onChange={onChangeTodoPredictedPomo}
                                    value={groupTodoInput.predictedPomo}
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
                            수정하기
                        </Button>
                        <Button
                            sx={{
                                width: '22%',
                                fontSize: '16px',
                                color: (theme) => theme.colors.pageBg,
                                background: (theme) => theme.colors.gray,
                                borderRadius: '8px',
                            }}
                            onClick={closeModifyTodo}
                            variant="contained"
                            color="success"
                        >
                            취소
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <Dialog
                open={Boolean(selectedDeleteTodo)}
                keepMounted
                onClose={() => setSelectedDeleteTodo(null)}
                aria-describedby="stop-dialog"
            >
                <DialogTitle
                    sx={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        p: '18px',
                        color: (theme) => theme.colors.greenText,
                    }}
                >
                    {'Todo 삭제'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: '16px' }} id="stop-dialog">
                        정말로 삭제하시겠습니까?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ pb: '16px', pr: '16px' }}>
                    <Button
                        sx={{
                            color: (theme) => theme.colors.pageBg,
                            background: (theme) => theme.colors.greenButton,
                            borderRadius: '8px',
                        }}
                        variant="contained"
                        color="success"
                        onClick={() => {
                            deleteTodo(selectedDeleteTodo)
                            setSelectedDeleteTodo(null)
                        }}
                    >
                        삭제
                    </Button>
                    <Button
                        sx={{
                            color: (theme) => theme.colors.pageBg,
                            background: (theme) => theme.colors.gray,
                            borderRadius: '8px',
                        }}
                        variant="contained"
                        color="success"
                        onClick={() => setSelectedDeleteTodo(null)}
                    >
                        취소
                    </Button>
                </DialogActions>
            </Dialog>
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
        </>
    )
}

export default GroupTodoComponent