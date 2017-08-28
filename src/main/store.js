import { createStore as createBasicStore } from 'redux';
import { combineReducers } from 'redux-immutable';

const reducer = combineReducers({
    dummy: (state = '') => state,
});

const createStore = () => createBasicStore(reducer);

export default createStore;
