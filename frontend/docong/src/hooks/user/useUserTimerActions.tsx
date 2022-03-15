import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { actions } from '../../modules/user'

export default function useUserTimerActions() {
  const dispatch = useDispatch()

  const onChangeUserTimerType = useCallback(
    (type) => dispatch(actions.changeUserTimerType(type)),
    [dispatch]
  )

  const onStartUserTimer = useCallback(
    () => dispatch(actions.startUserTimer()),
    [dispatch]
  )

  const onStopUserTimer = useCallback(
    () => dispatch(actions.stopUserTimer()),
    [dispatch]
  )

  const onFinishUserTimer = useCallback(
    () => dispatch(actions.finishUserTimer()),
    [dispatch]
  )

  const onTickUserTimer = useCallback(
    () => dispatch(actions.tickUserTimer()),
    [dispatch]
  )

  return {
    onChangeUserTimerType,
    onStartUserTimer,
    onStopUserTimer,
    onFinishUserTimer,
    onTickUserTimer,
  }
}
