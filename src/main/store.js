import { createStore as createBasicStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import locations from './reducer';

const reducers = combineReducers({
    locations,
});

const createStore = () => createBasicStore(reducers);

export default createStore;
