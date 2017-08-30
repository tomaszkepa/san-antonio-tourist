// @flow
import { Map, List } from 'immutable';

export const getLocations = (state: Map<*, *>) => state.getIn(['locations', 'positions'], List());
