import {
  createStore,
  applyMiddleware
} from 'redux'
import promise from 'redux-promise';
import reducer from '../reducers'

export default function configureStore() {
  return createStore(
    reducer,
    applyMiddleware(promise)
  )
}
