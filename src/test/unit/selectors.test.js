import { Map, List } from 'immutable';
import {
    expect,
    it,
} from '../common/test-base';

import {
    getLocations,
} from '../../main/selectors';

describe('Selectors', () => {
    const initState = Map({
        locations: new Map({
            positions: List(['1', '2']),
        }),
    });

    it('getLocations selector should return default value', () => {
        const newState = getLocations(Map());
        expect(newState).to.equal(List());
    });

    it('getLocations selector should return proper value', () => {
        const newState = getLocations(initState);
        expect(newState).to.equal(List(['1', '2']));
    });

});
