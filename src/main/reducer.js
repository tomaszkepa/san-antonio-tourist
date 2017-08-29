// @flow
import { Map } from 'immutable';

// TODO: Remove
const initialState = {
    positions: [
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
    ],
};

/**
 * A map from action types to reducers
 * @type {ActionToReducerMapType}
 */
const actionToReducerMap: { [key: string]: (f: Map) => Map } = {};

/**
 * Locations component reducer.
 * * isAddSelectionAction -> Toggles the selection isAdded value
 * @param {Map} state The application state
 * @param {Object} action The action dispatched
 * @returns {Map} The resulting state
 */
const locations = (state: Map = Map(initialState), action: Object): Map => {
    if (actionToReducerMap[action.type]) {
        return actionToReducerMap[action.type](state, action);
    }

    return state;
};

export default locations;
