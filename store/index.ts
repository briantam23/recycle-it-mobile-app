import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import what from './what';
import where from './where';
import users from './users';
import materials from './materials';
import toggle from './toggle';

export interface reducerLayout {
  state: string[],
  action: object | null,
};

const reducer = combineReducers({
  what,
  where,
  users,
  materials,
  toggle,
});

export default createStore(reducer, applyMiddleware(logger, thunk));
