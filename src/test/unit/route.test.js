import React from 'react';
import { shallow } from 'enzyme';
import { List } from 'immutable';

import {
    expect,
    it,
    before,
} from '../common/test-base';

import Route from '../../main/route/route';
import RouteContainer from '../../main/route/Container';

describe('<Route />', () => {
    before((t, done) => {
        t.wrapper = shallow(<Route locations={List()} />);
        done();
    });

    it('renders a <Route /> component', (t) => {
        expect(t.wrapper.find('div').filter('.sat__route')).to.have.length(1);
    });

    it('renders a <Route /> component with btn', (t) => {
        expect(t.wrapper.find('button').filter('.sat__route__btn')).to.have.length(1);
    });
});

describe('Route Container', () => {
    it('should have mapStateToProps function', () => {
        const mapStateToProps = RouteContainer.__get__('mapStateToProps');
        expect(mapStateToProps).is.a('Function');
    });
});
