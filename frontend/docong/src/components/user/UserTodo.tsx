import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Board, { moveCard } from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
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
import { Todo, TodoInput } from '../../api/todo'
import produce from 'immer'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../modules'
import { lighten, darken } from 'polished'
import { changeUserTimerTodo } from '../../modules/user'
import './UserTodo.scss'
import EditIcon from '@mui/icons-material/Edit'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import CircleIcon from '@mui/icons-material/Circle'
import { BASE_URL } from '../../api/auth'
import Api from '../../lib/customApi'

interface UserTodoProps {
  userTodos: any
  createTodo: (todoInput: TodoInput) => void
  modifyTodo: (todoId: number, todoInput: TodoInput) => void
  deleteTodo: (todoId: any) => void
  modifyTodoStatus: (todoId: number, todoStatus: string) => void
  startTodoTimer: (selectedTodo: Todo) => void
}

function UserTodo({
  userTodos,
  createTodo,
  modifyTodo,
  deleteTodo,
  modifyTodoStatus,
  startTodoTimer,
}: UserTodoProps) {
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
  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null)

  const [todoInput, setTodoInput] = useState({
    title: '',
    content: '',
    predictedPomo: 1,
    teamId: null,
    userEmail: userInfo ? userInfo.email : null,
    workImportance: '중',
    workProficiency: '중급',
    workType: '개발',
  })

  const dispatch = useDispatch()

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
  const todoStatus = ['TODO', 'IN_PROGRESS', 'DONE']

  useEffect(() => {
    if (userTodos !== null) {
      const todo = userTodos
        .filter((userTodo: Todo) => userTodo.status === 'TODO')
        .map((userTodo: Todo) => ({
          id: userTodo.seq,
          title: userTodo.title,
          content: userTodo.content,
          activate: userTodo.activate,
          userEmail: userTodo.userEmail,
          userImg: userTodo.userImg,
          userName: userTodo.userName,
          workImportance: userTodo.workImportance,
          workProficiency: userTodo.workProficiency,
          workType: userTodo.workType,
          predictedPomo: userTodo.predictedPomo,
          realPomo: userTodo.realPomo,
          status: userTodo.status,
        }))
      const inProgress = userTodos
        .filter((userTodo: Todo) => userTodo.status === 'IN_PROGRESS')
        .map((userTodo: Todo) => ({
          id: userTodo.seq,
          title: userTodo.title,
          content: userTodo.content,
          activate: userTodo.activate,
          userEmail: userTodo.userEmail,
          userImg: userTodo.userImg,
          userName: userTodo.userName,
          workImportance: userTodo.workImportance,
          workProficiency: userTodo.workProficiency,
          workType: userTodo.workType,
          predictedPomo: userTodo.predictedPomo,
          realPomo: userTodo.realPomo,
          status: userTodo.status,
        }))
      const done = userTodos
        .filter((userTodo: Todo) => userTodo.status === 'DONE')
        .map((userTodo: Todo) => ({
          id: userTodo.seq,
          title: userTodo.title,
          content: userTodo.content,
          activate: userTodo.activate,
          userEmail: userTodo.userEmail,
          userImg: userTodo.userImg,
          userName: userTodo.userName,
          workImportance: userTodo.workImportance,
          workProficiency: userTodo.workProficiency,
          workType: userTodo.workType,
          predictedPomo: userTodo.predictedPomo,
          realPomo: userTodo.realPomo,
          status: userTodo.status,
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
            userTodos.find(
              (userTodo: Todo) => userTodo.seq === userTimer.selectedTodo.seq
            )
          )
        )
      }
    }
  }, [userTodos])

  const setInitialTodoInput = () => {
    setTodoInput({
      title: '',
      content: '',
      predictedPomo: 1,
      teamId: null,
      userEmail: userInfo ? userInfo.email : null,
      workImportance: '중',
      workProficiency: '중급',
      workType: '개발',
    })
  }

  const openCreateTodoForm = () => {
    setInitialTodoInput()
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
      alert('Todo 를 먼저 선택해주세요.')
    }
  }

  const openModifyTodoForm = (card: any) => {
    setModifyTodoId(card.id)
    setTodoInput({
      title: card.title,
      content: card.content,
      predictedPomo: card.predictedPomo,
      teamId: null,
      userEmail: userInfo ? userInfo.email : null,
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

  const onChangeTodoTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoInput({ ...todoInput, title: e.target.value })
  }

  const onChangeTodoContent = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoInput({ ...todoInput, content: e.target.value })
  }

  const onChangeTodoPredictedPomo = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoInput({ ...todoInput, predictedPomo: Number(e.target.value) })
  }

  const onChangeTodoImportance = (e: SelectChangeEvent<string>) => {
    setTodoInput({ ...todoInput, workImportance: e.target.value })
  }

  const onChangeTodoProficiency = (e: SelectChangeEvent<string>) => {
    setTodoInput({ ...todoInput, workProficiency: e.target.value })
  }

  const onChangeTodoType = (e: SelectChangeEvent<string>) => {
    setTodoInput({ ...todoInput, workType: e.target.value })
  }

  const onClickPredictPomo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (userInfo && userInfo.birth) {
      let start_date = new Date()
      let end_date = new Date()
      start_date.setSeconds(
        start_date.getSeconds() - start_date.getTimezoneOffset() * 60
      )
      end_date.setSeconds(
        end_date.getSeconds() + 1500 - end_date.getTimezoneOffset() * 60
      )
      const predictData = {
        birth: userInfo.birth,
        end_time: end_date.toISOString(),
        gender: userInfo.gender,
        importance: todoInput.workImportance,
        job: userInfo.job,
        mbti: userInfo.mbti,
        position: userInfo.position,
        proficiency: todoInput.workProficiency,
        start_time: start_date.toISOString(),
        time_status: 'BASIC',
        type: todoInput.workType,
      }
      const predictPomoResponse: any = await Api.post(
        `${BASE_URL}/api/todo/predict`,
        predictData
      )
      let realPredictPomo = 1
      if (predictPomoResponse.data.pred / 2 > 1) {
        realPredictPomo = Math.min(
          Math.round(predictPomoResponse.data.pred / 2),
          12
        )
      }
      setTodoInput({
        ...todoInput,
        predictedPomo: realPredictPomo,
      })
    }
  }

  const onSubmitCreateTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createTodo(todoInput)
    setInitialTodoInput()
    closeCreateTodo()
  }

  const onSubmitModifyTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    modifyTodo(modifyTodoId, todoInput)
    closeModifyTodo()
  }

  const handleCardMove = (card: any, source: any, destination: any) => {
    const updatedBoard = moveCard(board, source, destination)
    setBoard(updatedBoard)
    modifyTodoStatus(card.id, todoStatus[destination['toColumnId']])
    if (userTimer.selectedTodo) {
      if (
        todoStatus[destination['toColumnId']] === 'DONE' &&
        userTimer.selectedTodo.seq === card.id
      ) {
        dispatch(changeUserTimerTodo(null))
      }
    }
  }

  const handleCardRemove = (card: any) => {
    setSelectedDeleteTodo(card.id)
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
                    onClick={openCreateTodoForm}
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
                  background: (theme) => `${darken(0.05, theme.colors.doCard)}`,
                },
                '&:active': {
                  background: (theme) => `${darken(0.1, theme.colors.doCard)}`,
                },
              },
              card.id === (selectedTodo ? selectedTodo.seq : null) && {
                background: (theme) => `${darken(0.05, theme.colors.doCard)}`,
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
                    fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
                    '&:hover': {
                      color: (theme) => `${darken(0.5, theme.colors.gray)}`,
                    },
                    '&:active': {
                      color: (theme) => `${darken(0.7, theme.colors.gray)}`,
                    },
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
                    '&:hover': {
                      color: (theme) => `${darken(0.4, theme.colors.gray)}`,
                    },
                    '&:active': {
                      color: (theme) => `${darken(0.6, theme.colors.gray)}`,
                    },
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
                    fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                    background:
                      workTypeColors[workTypeList.indexOf(card.workType)],
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
                        : '/images/Profile_Default.png'
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
            fontSize: '30px',
            fontWeight: 'bold',
            fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
      </Box>
      <Dialog open={isOpenCreateTodo} onClose={closeCreateTodo}>
        <DialogTitle
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
                  value={todoInput.title}
                  color="success"
                  sx={{
                    mb: '14px',
                  }}
                />
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  id="content"
                  variant="outlined"
                  onChange={onChangeTodoContent}
                  value={todoInput.content}
                  color="success"
                  sx={{ mb: '14px' }}
                />
                <Select
                  required
                  fullWidth
                  id="work-type"
                  value={todoInput.workType}
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
                          fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
                  value={todoInput.workImportance}
                  onChange={onChangeTodoImportance}
                  color="success"
                  sx={{
                    mb: '14px',
                    '> div': {
                      display: 'flex',
                      alignItems: 'center',
                      fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                    },
                  }}
                >
                  {workImportanceList.map((workImportance, index) => (
                    <MenuItem
                      sx={{
                        fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                      }}
                      key={index}
                      value={workImportance}
                    >
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
                  value={todoInput.workProficiency}
                  onChange={onChangeTodoProficiency}
                  color="success"
                  sx={{
                    mb: '14px',
                    fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                  }}
                >
                  {workProficiencyList.map((workProficiency, index) => (
                    <MenuItem
                      sx={{
                        fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                      }}
                      key={index}
                      value={workProficiency}
                    >
                      {workProficiency}
                    </MenuItem>
                  ))}
                </Select>
                <Box sx={{ display: 'flex', mb: '14px' }}>
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
                    value={todoInput.predictedPomo}
                    color="success"
                    sx={{ mr: '12px' }}
                  />
                  {userInfo && userInfo.birth && (
                    <Box>
                      <Button
                        sx={{
                          width: '150px',
                          height: '56px',
                          fontSize: '20px',
                          fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                          color: (theme) => theme.colors.pageBg,
                          background: (theme) => theme.colors.greenButton,
                          borderRadius: '8px',
                        }}
                        variant="contained"
                        color="success"
                        onClick={onClickPredictPomo}
                      >
                        콩 예측하기
                      </Button>
                    </Box>
                  )}
                  {userInfo && !userInfo.birth && (
                    <Tooltip title="사용자 추가 정보 입력이 필요합니다.">
                      <Box>
                        <Button
                          sx={{
                            width: '150px',
                            height: '56px',
                            fontSize: '20px',
                            fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                            color: (theme) => theme.colors.pageBg,
                            background: (theme) => theme.colors.greenButton,
                            borderRadius: '8px',
                          }}
                          variant="contained"
                          color="success"
                          disabled
                        >
                          콩 예측하기
                        </Button>
                      </Box>
                    </Tooltip>
                  )}
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: '0 24px 20px 24px' }}>
            <Button
              sx={{
                width: '22%',
                fontSize: '16px',
                fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
                fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
            fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
                  value={todoInput.title}
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
                  value={todoInput.content}
                  color="success"
                  sx={{ mb: '14px' }}
                />
                <Select
                  required
                  fullWidth
                  id="work-type"
                  value={todoInput.workType}
                  onChange={onChangeTodoType}
                  color="success"
                  sx={{
                    mb: '14px',
                    fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                  }}
                >
                  {workTypeList.map((workType, index) => (
                    <MenuItem key={index} value={workType}>
                      <Chip
                        sx={{
                          color: (theme) => theme.colors.basicText,
                          fontWeight: 'bold',
                          fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
                  value={todoInput.workImportance}
                  onChange={onChangeTodoImportance}
                  color="success"
                  sx={{
                    mb: '14px',
                    '> div': {
                      display: 'flex',
                      alignItems: 'center',
                      fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                    },
                  }}
                >
                  {workImportanceList.map((workImportance, index) => (
                    <MenuItem
                      sx={{
                        fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                      }}
                      key={index}
                      value={workImportance}
                    >
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
                  value={todoInput.workProficiency}
                  onChange={onChangeTodoProficiency}
                  color="success"
                  sx={{
                    mb: '14px',
                    fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                  }}
                >
                  {workProficiencyList.map((workProficiency, index) => (
                    <MenuItem
                      sx={{
                        fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                      }}
                      key={index}
                      value={workProficiency}
                    >
                      {workProficiency}
                    </MenuItem>
                  ))}
                </Select>
                <Box sx={{ display: 'flex', mb: '14px' }}>
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
                    value={todoInput.predictedPomo}
                    color="success"
                    sx={{ mr: '12px' }}
                  />
                  {userInfo && userInfo.birth && (
                    <Box>
                      <Button
                        sx={{
                          width: '150px',
                          height: '56px',
                          fontSize: '20px',
                          fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                          color: (theme) => theme.colors.pageBg,
                          background: (theme) => theme.colors.greenButton,
                          borderRadius: '8px',
                        }}
                        variant="contained"
                        color="success"
                        onClick={onClickPredictPomo}
                      >
                        콩 예측하기
                      </Button>
                    </Box>
                  )}
                  {userInfo && !userInfo.birth && (
                    <Tooltip title="사용자 추가 정보 입력이 필요합니다.">
                      <Box>
                        <Button
                          sx={{
                            width: '150px',
                            height: '56px',
                            fontSize: '20px',
                            fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
                            color: (theme) => theme.colors.pageBg,
                            background: (theme) => theme.colors.greenButton,
                            borderRadius: '8px',
                          }}
                          variant="contained"
                          color="success"
                          disabled
                        >
                          콩 예측하기
                        </Button>
                      </Box>
                    </Tooltip>
                  )}
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: '0 24px 20px 24px' }}>
            <Button
              sx={{
                width: '22%',
                fontSize: '16px',
                fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
                fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
            fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
            p: '18px',
            color: (theme) => theme.colors.greenText,
          }}
        >
          {'Todo 삭제'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: '16px',
              fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
            }}
            id="stop-dialog"
          >
            정말로 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: '16px', pr: '16px' }}>
          <Button
            sx={{
              fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
              fontFamily: 'MapoPeacefull, TmoneyRoundWindRegular',
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
    </>
  )
}

export default UserTodo
