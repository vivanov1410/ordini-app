import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './rootReducer'
import { fetchRecipes } from './modules/recipes'

export default function configureStore(initialState = {}) {
  const loggerMiddleware = createLogger()

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      loggerMiddleware
    ))

  store.dispatch(fetchRecipes())

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

