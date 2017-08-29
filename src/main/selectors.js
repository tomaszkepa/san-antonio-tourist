// @flow
import { Map } from 'immutable';

export const getLocations = (state: Map<*, *>) => state.getIn(['locations', 'positions'], []);
