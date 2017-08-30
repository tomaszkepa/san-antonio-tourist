import { createStore as createBasicStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';

import middlewares from './middlewares';
import locations from './reducer';

const reducers = combineReducers({
    locations,
});

const createStore = () => createBasicStore(reducers, applyMiddleware(...middlewares));

export default createStore;
