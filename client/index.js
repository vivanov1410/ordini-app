import configureStore from '../shared/redux/configureStore'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import React from 'react'
import { Router, browserHistory } from 'react-router'
import routes from '../shared/routes'

const store = configureStore(window.__INITIAL_STATE__)
const history = browserHistory

render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), document.getElementById('root'))
