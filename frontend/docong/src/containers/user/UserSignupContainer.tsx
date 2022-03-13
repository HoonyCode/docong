import { useDispatch } from 'react-redux'
import { SignupData } from '../../api/user'
import UserSignupForm from '../../components/user/UserSignupForm'
import { userSignupAsync } from '../../modules/user'

function UserSignupContainer() {
  const dispatch = useDispatch()

  // 회원가입 요청
  const onSignupSubmit = (signupInput: SignupData) => {
    dispatch(userSignupAsync.request(signupInput))
  }

  return <UserSignupForm onSignupSubmit={onSignupSubmit} />
}

export default UserSignupContainer
