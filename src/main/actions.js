// @flow
import {
    ADD_LOCATION,
} from './constants';

/**
 * Checks if the passed action is of type ADD_LOCATION
 * @param {Object} action The action to be checked
 * @returns {Boolean} True if type is equal to ADD_LOCATION. False otherwise.
 */
export const isAddLocationAction = (action: Object): boolean => (
    action && action.type === ADD_LOCATION
);

/**
 * Add location to list
 * @param {position} position of the location
 * @returns {Object} The action to be dispatched
 */
export const addLocation = (position: { [key: string]: number }) => ({
    type: ADD_LOCATION,
    position,
});
