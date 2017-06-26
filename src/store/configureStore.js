import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-route-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const initialState = {}

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, initialState, applyMiddleware(thunk), enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

export default store
