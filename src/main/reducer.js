// @flow
import { Map, List } from 'immutable';

import {
    isAddLocationAction,
} from './actions';

import {
    ADD_LOCATION,
} from './constants';

// TODO: Remove
const initialState = Map({
    positions: List([
        {
            lat: 29.4059225,
            lng: -98.4268012,
        }, {
            lat: 29.4159225,
            lng: -98.4468012,
        }, {
            lat: 29.4559225,
            lng: -98.4168012,
        }, {
            lat: 29.1559225,
            lng: -98.2168012,
        },
    ]),
});


/**
 * Log in attempt failed - display a message
 * @param {Map} state The state
 * @param {Object} action The action triggering the update
 * @returns {Map} The new state
 */
const addLocation = (state: Map<*, *>, action: Object): Map<*, *> => {
    if (isAddLocationAction(action)) {
        return state
            .set('positions', state.get('positions').push(action.position));
    }

    return state;
};

/**
 * A map from action types to reducers
 * @type {ActionToReducerMapType}
 */
const actionToReducerMap: { [key: string]: (f: Map) => Map } = {
    [ADD_LOCATION]: addLocation,
};

/**
 * Locations component reducer.
 * * isAddSelectionAction -> Toggles the selection isAdded value
 * @param {Map} state The application state
 * @param {Object} action The action dispatched
 * @returns {Map} The resulting state
 */
const locations = (state: Map = initialState, action: Object): Map => {
    if (actionToReducerMap[action.type]) {
        return actionToReducerMap[action.type](state, action);
    }

    return state;
};

export default locations;
