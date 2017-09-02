import { Map, List } from 'immutable';

import {
    expect,
    it,
} from '../common/test-base';

import { default as reducer } from '../../main/reducer';

import {
    addLocation,
} from '../../main/actions';

const initialState = Map({
    positions: List(),
});

describe('App reducer', () => {
    it('should return the same state when no action defined', () => {
        const result = reducer(initialState, { type: 'unknown' });
        expect(result).to.equal(initialState);
    });

    it('should set positions when addLocation() action', () => {
        const result = reducer(initialState, addLocation({
            place: {},
            lat: 0,
            lng: 0,
        }));

        expect(result).to.be.a('Object');
        expect(result).to.have.property('positions');
        expect(result.get('positions').size).to.equal(1);
    });
});
