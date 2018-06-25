import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
// used for async func use on redux
// import thunk from 'redux-thunk'

import reducers from '../reducers'

export const history = createBrowserHistory()

export const store = createStore(
  connectRouter(history)(reducers),
  applyMiddleware(
    routerMiddleware(history), // for dispatching history actions
    logger
  )
)
