import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';

import {
    expect,
    it,
    before,
} from '../common/test-base';

import Locations from '../../main/locations/locations';
import LocationsContainer from '../../main/locations/Container';

describe('<Locations />', () => {
    before((t, done) => {
        t.wrapper = shallow(<Locations locations={List([{ place: { formatted_address: 'test' } }])} />);
        done();
    });

    it('renders a <Locations /> component', (t) => {
        expect(t.wrapper.find('div').filter('.sat__locations')).to.have.length(1);
    });

    it('renders a <Locations /> component with location list', (t) => {
        expect(t.wrapper.find('ul').filter('.sat__locations__list')).to.have.length(1);
        expect(t.wrapper.find('li').filter('.collection-item')).to.have.length(1);
    });
});

describe('Locations Container', () => {
    it('should have mapStateToProps function', () => {
        const mapStateToProps = LocationsContainer.__get__('mapStateToProps');
        expect(mapStateToProps).is.a('Function');
    });
});
