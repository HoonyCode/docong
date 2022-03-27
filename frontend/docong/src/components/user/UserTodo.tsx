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
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import { Todo, TodoInput } from '../../api/todo'
import produce from 'immer'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../modules'
import { darken } from 'polished'
import { changeUserTimerTodo } from '../../modules/user'
import './UserTodo.scss'
import TableRowsIcon from '@mui/icons-material/TableRows'

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
    '문서화',
    '학습',
    '독서',
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
      workType: '',
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
        allowRemoveCard
        onCardDragEnd={handleCardMove}
        onCardRemove={handleCardRemove}
        disableColumnDrag
        renderColumnHeader={(column: any) => (
          <Box
            key={column.id}
            sx={{
              textAlign: 'center',
              fontSize: '34px',
              fontWeight: 'bold',
              color: (theme) => theme.colors.greenText,
              mb: '3vh',
            }}
          >
            {column.title}
          </Box>
        )}
        renderCard={(card: any, { dragging }: any) => (
          <Card
            key={card.id}
            sx={[
              {
                width: '330px',
                height: '130px',
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
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                  gutterBottom
                >
                  {card.title}
                </Typography>
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex' }}>
                <TableRowsIcon
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
                mb: '10px',
                fontSize: '14px',
                fontWeight: 'bold',
                color: (theme) => theme.colors.lightGreenText,
              }}
            >{`${card.realPomo} / ${card.predictedPomo} 콩`}</Box>
            <Grid container>
              <Grid item xs={6}>
                <Chip
                  sx={{
                    color: (theme) => theme.colors.basicText,
                    fontWeight: 'bold',
                    background: (theme) => theme.colors.badge1,
                  }}
                  label={card.workType}
                  color="primary"
                  size="small"
                />
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Avatar
                  sx={{ width: 28, height: 28 }}
                  alt="Remy Sharp"
                  src="https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg"
                />
              </Grid>
            </Grid>
          </Card>
        )}
      >
        {board}
      </Board>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          px: '5px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '360px',
            mx: '1vw',
            px: '15px',
          }}
        >
          <Tooltip title="Todo 추가">
            <Fab
              sx={{
                color: (theme) => `${darken(0.5, theme.colors.todoCard)}`,
                background: (theme) => theme.colors.doCard,
              }}
              aria-label="add"
              onClick={openCreateTodoForm}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
        <Box sx={{ width: '360px', m: '1vw 1vw 1vw 2.5vw' }}></Box>
        <Box sx={{ width: '360px', m: '1vw 1vw 1vw 2.5vw' }}></Box>
      </Box>
      <Box sx={{ display: 'flex', p: 3, flexGrow: 1, alignItems: 'end' }}>
        <Button
          sx={{
            fontSize: '24px',
            color: (theme) => theme.colors.lightGreenText,
            mb: '5vh',
          }}
          variant={'text'}
          color="success"
          onClick={onClickStartTodoTimer}
        >
          선택한 두콩 시작하기
        </Button>
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
                  sx={{ mb: '14px' }}
                >
                  {workTypeList.map((workType, index) => (
                    <MenuItem key={index} value={workType}>
                      {workType}
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
                  sx={{ mb: '14px' }}
                >
                  {workImportanceList.map((workImportance, index) => (
                    <MenuItem key={index} value={workImportance}>
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
                      max: 99,
                      min: 1,
                    },
                  }}
                  onChange={onChangeTodoPredictedPomo}
                  value={todoInput.predictedPomo}
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
                  sx={{ mb: '14px' }}
                >
                  {workTypeList.map((workType, index) => (
                    <MenuItem key={index} value={workType}>
                      {workType}
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
                  sx={{ mb: '14px' }}
                >
                  {workImportanceList.map((workImportance, index) => (
                    <MenuItem key={index} value={workImportance}>
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
                      max: 99,
                      min: 1,
                    },
                  }}
                  onChange={onChangeTodoPredictedPomo}
                  value={todoInput.predictedPomo}
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
    </>
  )
}

export default UserTodo
