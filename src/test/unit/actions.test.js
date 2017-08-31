import {
    expect,
    it,
} from '../common/test-base';

import {
    addLocation,
    isAddLocationAction,
} from '../../main/actions';

import {
    ADD_LOCATION,
} from '../../main/constants';

describe('Actions', () => {
    describe('addLocation', () => {
        it('should return an action with the correct type', () => {
            expect(addLocation()).to.have.property('type')
                .that.is.a('string')
                .that.equals(ADD_LOCATION);
        });
    });

    describe('isAddLocationAction', () => {
        it('should return boolean as a result if action type is equal to "ADD_LOCATION"', () => {
            expect(isAddLocationAction({ type: ADD_LOCATION })).to.equal(true);
            expect(isAddLocationAction({ type: 'test' })).to.not.equal(true);
        });
    });
});
