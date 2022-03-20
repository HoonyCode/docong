import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import user, { userSaga } from './user'
import todo, { todoSaga } from './todo'

// redux-persist : store 의 데이터를 localStorage 에 저장해서 유지할 수 있음
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// redux-persist 적용 1
const persistConfig = {
  key: 'root',
  storage: storage,
}

// 모든 Reducer 를 모아서 rootReducer 로 export
const rootReducer = combineReducers({
  user,
  todo,
})

// redux-persist 적용 2
export default persistReducer(persistConfig, rootReducer)

// rootReducer 의 return 값(타입)을 유추
// 추후 컨테이너 컴포넌트에서 불러와서 사용할 수 있도록 export
export type RootState = ReturnType<typeof rootReducer>

// 모든 Saga 를 모아서 rootSaga 로 export
export function* rootSaga() {
  yield all([userSaga(), todoSaga()])
}
