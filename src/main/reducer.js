// @flow
import type { Map } from 'immutable';

/**
 * A map from action types to reducers
 * @type {ActionToReducerMapType}
 */
const actionToReducerMap: { [key: string]: (f: Map) => Map } = {
};

/**
 * Selection component reducer.
 * * isAddSelectionAction -> Toggles the selection isAdded value
 * @param {Map} state The application state
 * @param {Object} action The action dispatched
 * @returns {Map} The resulting state
 */
const reducer = (state: Map, action: Object): Map => {
    if (actionToReducerMap[action.type]) {
        return actionToReducerMap[action.type](state, action);
    }

    return state;
};

export default reducer;
