import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import promise from 'redux-promise';
import reducer from '../reducers'
import DevTools from '../containers/root/dev-tools';

export default function configureStore() {
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(promise),
      DevTools.instrument()
    )
  )

  // if (module.hot) {
  //     module.hot.accept('../reducers', () => {
  //         const nextRootReducer = require('../reducers').default
  //         store.replaceReducer(nextRootReducer)
  //     })
  // }

  return store
}
