import { createStore as createBasicStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import { Iterable } from 'immutable';

import locations from './reducer';

const reducers = combineReducers({
    locations,
});

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
    const { createLogger } = require('redux-logger');

    const logger = createLogger({
        stateTransformer: (state) => {
            if (Iterable.isIterable(state)) {
                return state.toJS();
            }
            return state;
        },
    });

    middlewares.push(logger);
}

const createStore = () => createBasicStore(reducers, applyMiddleware(...middlewares));

export default createStore;
