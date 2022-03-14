import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SignupData } from '../../api/user'
import UserSignupForm from '../../components/user/UserSignupForm'
import { userSignupAsync } from '../../modules/user'

function UserSignupContainer() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 회원가입 요청
  const onSignupSubmit = (signupInput: SignupData) => {
    dispatch(userSignupAsync.request({ signupInput: signupInput, navigate }))
  }

  return <UserSignupForm onSignupSubmit={onSignupSubmit} />
}

export default UserSignupContainer
