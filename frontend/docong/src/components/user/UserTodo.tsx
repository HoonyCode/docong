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
  InputLabel,
  Select,
  TextField,
  Tooltip,
  SelectChangeEvent,
  Card,
  Typography,
  Chip,
  AvatarGroup,
  Avatar,
  Grid,
} from '@mui/material'
import { green } from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { Todo, TodoInput } from '../../api/todo'
import produce from 'immer'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../modules'
import { darken, lighten } from 'polished'
import { changeUserTimerTodo } from '../../modules/user'

interface UserTodoProps {
  userTodos: any
  createTodo: (todoInput: TodoInput) => void
  modifyTodo: (todoId: number, todoInput: TodoInput) => void
  deleteTodo: (todoId: number) => void
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
    workType: '기타',
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
    '기타',
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
      workType: '',
    })
  }

  const openCreateTodoForm = () => {
    setInitialTodoInput()
    setIsOpenCreateTodo(true)
  }

  const onSelectTodo = (card: any) => {
    if (card.status === 'DONE') {
      alert('완료된 콩은 선택할 수 없습니다!')
    } else {
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
  }

  const onClickStartTodoTimer = () => {
    if (selectedTodo) {
      startTodoTimer(selectedTodo)
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
    if (selectedTodo) {
      if (
        todoStatus[destination['toColumnId']] === 'DONE' &&
        selectedTodo.seq === card.id
      ) {
        alert('완료된 콩은 선택할 수 없습니다!')
        setSelectedTodo(null)
      }
    }
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
    deleteTodo(card.id)
  }

  return (
    <>
      <Box sx={{ '& > :not(style)': { m: 3 } }}>
        <Tooltip title="CreateTodo">
          <Fab color="primary" aria-label="add" onClick={openCreateTodoForm}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
      <Box sx={{ '& > :not(style)': { m: 3 } }}>
        <Tooltip title="StartTodo">
          <Fab
            color="primary"
            aria-label="start"
            onClick={onClickStartTodoTimer}
          >
            <PlayArrowOutlinedIcon />
          </Fab>
        </Tooltip>
      </Box>
      <Board
        allowRemoveCard
        onCardDragEnd={handleCardMove}
        onCardRemove={handleCardRemove}
        disableColumnDrag
        renderCard={(card: any, { dragging }: any) => (
          <Card
            sx={[
              {
                minWidth: 275,
                p: 1,
                cursor: 'pointer',
                '&:hover': {
                  background: `${lighten(0.1, '#BAE691')}`,
                },
                '&:active': {
                  background: `${darken(0.1, '#BAE691')}`,
                },
              },
              card.id === (selectedTodo ? selectedTodo.seq : null) && {
                background: `${lighten(0.1, '#BAE691')}`,
              },
            ]}
            onClick={() => onSelectTodo(card)}
          >
            <Grid container>
              <Grid item xs={10}>
                <Typography
                  sx={{ display: 'inline-block', fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {card.title}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <CloseIcon
                  sx={{ display: 'block', ml: 'auto', cursor: 'pointer' }}
                  onClick={() => handleCardRemove(card)}
                />
              </Grid>
            </Grid>
            <Chip
              sx={{ mb: 1 }}
              label={card.workType}
              color="primary"
              size="small"
            />
            <Grid container>
              <Grid item xs={6}>
                <Avatar
                  sx={{
                    bgcolor: green[500],
                    width: 28,
                    height: 28,
                    cursor: 'pointer',
                  }}
                  onClick={() => openModifyTodoForm(card)}
                >
                  <BorderColorOutlinedIcon fontSize="small" />
                </Avatar>
              </Grid>
              <Grid item xs={6}>
                <AvatarGroup max={4}>
                  <Avatar
                    sx={{ width: 28, height: 28 }}
                    alt="Remy Sharp"
                    src="https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg"
                  />
                  <Avatar
                    sx={{ width: 28, height: 28 }}
                    alt="Travis Howard"
                    src="https://blog.kakaocdn.net/dn/ej7HHN/btqEpJAha97/cSWVSFX8PrV03o15PZ8Bd1/img.jpg"
                  />
                </AvatarGroup>
              </Grid>
            </Grid>
          </Card>
        )}
      >
        {board}
      </Board>
      <Dialog open={isOpenCreateTodo} onClose={closeCreateTodo}>
        <DialogTitle>CreateTodo</DialogTitle>
        <Box component="form" onSubmit={onSubmitCreateTodo}>
          <DialogContent>
            <TextField
              required
              fullWidth
              id="title"
              label="Title"
              variant="outlined"
              onChange={onChangeTodoTitle}
              value={todoInput.title}
            />
            <TextField
              required
              fullWidth
              id="content"
              label="Content"
              variant="outlined"
              onChange={onChangeTodoContent}
              value={todoInput.content}
            />
            <TextField
              required
              fullWidth
              type="number"
              InputProps={{
                inputProps: {
                  max: 99,
                  min: 1,
                },
              }}
              label="Predicted Pomo"
              onChange={onChangeTodoPredictedPomo}
              value={todoInput.predictedPomo}
            />
            <InputLabel id="work-importance">Work Importance</InputLabel>
            <Select
              fullWidth
              labelId="work-importance"
              id="work-importance"
              value={todoInput.workImportance}
              onChange={onChangeTodoImportance}
            >
              {workImportanceList.map((workImportance, index) => (
                <MenuItem key={index} value={workImportance}>
                  {workImportance}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="work-proficiency">Work Proficiency</InputLabel>
            <Select
              fullWidth
              labelId="work-proficiency"
              id="work-proficiency"
              value={todoInput.workProficiency}
              onChange={onChangeTodoProficiency}
            >
              {workProficiencyList.map((workProficiency, index) => (
                <MenuItem key={index} value={workProficiency}>
                  {workProficiency}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="work-type">Work Type</InputLabel>
            <Select
              fullWidth
              labelId="work-type"
              id="work-type"
              value={todoInput.workType}
              onChange={onChangeTodoType}
            >
              {workTypeList.map((workType, index) => (
                <MenuItem key={index} value={workType}>
                  {workType}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Create</Button>
            <Button onClick={closeCreateTodo}>Cancel</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog open={isOpenModifyTodo} onClose={closeModifyTodo}>
        <DialogTitle>ModifyTodo</DialogTitle>
        <Box component="form" onSubmit={onSubmitModifyTodo}>
          <DialogContent>
            <TextField
              required
              fullWidth
              id="title"
              label="Title"
              variant="outlined"
              onChange={onChangeTodoTitle}
              value={todoInput.title}
            />
            <TextField
              required
              fullWidth
              id="content"
              label="Content"
              variant="outlined"
              onChange={onChangeTodoContent}
              value={todoInput.content}
            />
            <TextField
              required
              fullWidth
              type="number"
              InputProps={{
                inputProps: {
                  max: 99,
                  min: 1,
                },
              }}
              label="Predicted Pomo"
              onChange={onChangeTodoPredictedPomo}
              value={todoInput.predictedPomo}
            />
            <InputLabel id="work-importance">Work Importance</InputLabel>
            <Select
              fullWidth
              labelId="work-importance"
              id="work-importance"
              value={todoInput.workImportance}
              onChange={onChangeTodoImportance}
            >
              {workImportanceList.map((workImportance, index) => (
                <MenuItem key={index} value={workImportance}>
                  {workImportance}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="work-proficiency">Work Proficiency</InputLabel>
            <Select
              fullWidth
              labelId="work-proficiency"
              id="work-proficiency"
              value={todoInput.workProficiency}
              onChange={onChangeTodoProficiency}
            >
              {workProficiencyList.map((workProficiency, index) => (
                <MenuItem key={index} value={workProficiency}>
                  {workProficiency}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="work-type">Work Type</InputLabel>
            <Select
              fullWidth
              labelId="work-type"
              id="work-type"
              value={todoInput.workType}
              onChange={onChangeTodoType}
            >
              {workTypeList.map((workType, index) => (
                <MenuItem key={index} value={workType}>
                  {workType}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button type="submit">Modify</Button>
            <Button onClick={closeModifyTodo}>Cancel</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}

export default UserTodo
