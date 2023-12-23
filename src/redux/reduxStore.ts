import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import authReducer from './reducers/authReducer'
import profileReducer from './reducers/profileReducer'
import usersReducer from './reducers/usersReducer'
import thunkMiddleware from 'redux-thunk'
import appReducer from './reducers/appReducer'
import meteometerReducer from './reducers/meteometerReducer'
import assistantReducer from './reducers/assistantReducer'
import contactsReducer from './reducers/contactsReducer'
import spaceReducer from './reducers/spaceReducer'
import dvizhenimatorReducer from './reducers/dvizhenimatorReducer'
import discourseReducer from './reducers/discourseReducer'

let rootReducers = combineReducers({
  profilePage: profileReducer,
  usersPage: usersReducer,
  meteometer: meteometerReducer,
  auth: authReducer,
  app: appReducer,
  dvizhenimator: dvizhenimatorReducer,
  assistant: assistantReducer,
  mail: contactsReducer,
  space: spaceReducer,
  discourse: discourseReducer
})

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
