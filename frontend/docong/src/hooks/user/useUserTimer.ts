import { useSelector } from 'react-redux'
import { RootState } from '../../modules'
import { UserTimerKey } from '../../modules/user'

export default function useUserTimer(key: UserTimerKey) {
  const userTimer = useSelector((state: RootState) => state.user.userTimer[key])
  return userTimer
}
