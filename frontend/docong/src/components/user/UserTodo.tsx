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
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { Todo, TodoInput } from '../../api/todo'
import produce from 'immer'
import { useSelector } from 'react-redux'
import { RootState } from '../../modules'

interface UserTodoProps {
  userTodos: any
  createTodo: (todoInput: TodoInput) => void
  modifyTodo: (todoId: number, todoInput: TodoInput) => void
  deleteTodo: (todoId: number) => void
  modifyTodoStatus: (todoId: number, todoStatus: string) => void
}

function UserTodo({
  userTodos,
  createTodo,
  modifyTodo,
  deleteTodo,
  modifyTodoStatus,
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

  const [isOpenCreateTodo, setIsOpenCreateTodo] = useState(false)
  const [isOpenModifyTodo, setIsOpenModifyTodo] = useState(false)
  const [modifyTodoId, setModifyTodoId] = useState(0)

  const [TodoInput, setTodoInput] = useState({
    title: '',
    content: '',
    teamId: null,
    userEmail: userInfo ? userInfo.email : null,
    workImportance: 'MIDDLE',
    workProficiency: 'INTERMEDIATE',
    workType: 'TYPE1',
  })

  const workImportanceList = ['Lower', 'Middle', 'Upper_Middle', 'Upper']
  const workProficiencyList = ['Beginner', 'Intermediate', 'Advanced']
  const workTypeList = ['Type1', 'Type2']
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
      teamId: null,
      userEmail: userInfo ? userInfo.email : null,
      workImportance: 'MIDDLE',
      workProficiency: 'INTERMEDIATE',
      workType: 'TYPE1',
    })
  }

  const openCreateTodoForm = () => {
    setInitialTodoInput()
    setIsOpenCreateTodo(true)
  }

  const openModifyTodoForm = (card: any) => {
    setModifyTodoId(card.id)
    setTodoInput({
      title: card.title,
      content: card.content,
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
    setTodoInput({ ...TodoInput, title: e.target.value })
  }

  const onChangeTodoContent = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoInput({ ...TodoInput, content: e.target.value })
  }

  const onChangeTodoImportance = (e: SelectChangeEvent<string>) => {
    setTodoInput({ ...TodoInput, workImportance: e.target.value })
  }

  const onChangeTodoProficiency = (e: SelectChangeEvent<string>) => {
    setTodoInput({ ...TodoInput, workProficiency: e.target.value })
  }

  const onChangeTodoType = (e: SelectChangeEvent<string>) => {
    setTodoInput({ ...TodoInput, workType: e.target.value })
  }

  const onSubmitCreateTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createTodo(TodoInput)
    setInitialTodoInput()
    closeCreateTodo()
  }

  const onSubmitModifyTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    modifyTodo(modifyTodoId, TodoInput)
    closeModifyTodo()
  }

  const handleCardMove = (card: any, source: any, destination: any) => {
    const updatedBoard = moveCard(board, source, destination)
    setBoard(updatedBoard)
    modifyTodoStatus(card.id, todoStatus[destination['toColumnId']])
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
      <Board
        allowRemoveCard
        onCardDragEnd={handleCardMove}
        onCardRemove={handleCardRemove}
        disableColumnDrag
        renderCard={(card: Todo, { dragging }: any) => (
          <Card sx={{ minWidth: 275, p: 1 }}>
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
              value={TodoInput.title}
            />
            <TextField
              required
              fullWidth
              id="content"
              label="Content"
              variant="outlined"
              onChange={onChangeTodoContent}
              value={TodoInput.content}
            />
            <InputLabel id="work-importance">Work Importance</InputLabel>
            <Select
              fullWidth
              labelId="work-importance"
              id="work-importance"
              value={TodoInput.workImportance}
              onChange={onChangeTodoImportance}
            >
              {workImportanceList.map((workImportance, index) => (
                <MenuItem key={index} value={workImportance.toUpperCase()}>
                  {workImportance}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="work-proficiency">Work Proficiency</InputLabel>
            <Select
              fullWidth
              labelId="work-proficiency"
              id="work-proficiency"
              value={TodoInput.workProficiency}
              onChange={onChangeTodoProficiency}
            >
              {workProficiencyList.map((workProficiency, index) => (
                <MenuItem key={index} value={workProficiency.toUpperCase()}>
                  {workProficiency}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="work-type">Work Type</InputLabel>
            <Select
              fullWidth
              labelId="work-type"
              id="work-type"
              value={TodoInput.workType}
              onChange={onChangeTodoType}
            >
              {workTypeList.map((workType, index) => (
                <MenuItem key={index} value={workType.toUpperCase()}>
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
              value={TodoInput.title}
            />
            <TextField
              required
              fullWidth
              id="content"
              label="Content"
              variant="outlined"
              onChange={onChangeTodoContent}
              value={TodoInput.content}
            />
            <InputLabel id="work-importance">Work Importance</InputLabel>
            <Select
              fullWidth
              labelId="work-importance"
              id="work-importance"
              value={TodoInput.workImportance}
              onChange={onChangeTodoImportance}
            >
              {workImportanceList.map((workImportance, index) => (
                <MenuItem key={index} value={workImportance.toUpperCase()}>
                  {workImportance}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="work-proficiency">Work Proficiency</InputLabel>
            <Select
              fullWidth
              labelId="work-proficiency"
              id="work-proficiency"
              value={TodoInput.workProficiency}
              onChange={onChangeTodoProficiency}
            >
              {workProficiencyList.map((workProficiency, index) => (
                <MenuItem key={index} value={workProficiency.toUpperCase()}>
                  {workProficiency}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="work-type">Work Type</InputLabel>
            <Select
              fullWidth
              labelId="work-type"
              id="work-type"
              value={TodoInput.workType}
              onChange={onChangeTodoType}
            >
              {workTypeList.map((workType, index) => (
                <MenuItem key={index} value={workType.toUpperCase()}>
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
