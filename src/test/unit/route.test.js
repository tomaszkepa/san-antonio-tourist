import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
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
        t.wrapper = shallow(<Route locations={List()} directionsService={{ route: spy() }} />);
        done();
    });

    it('renders a <Route /> component', (t) => {
        expect(t.wrapper.find('div').filter('.sat__route')).to.have.length(1);
    });

    it('renders a <Route /> component with btn', (t) => {
        expect(t.wrapper.find('button').filter('.sat__route__btn')).to.have.length(1);
    });

    it('search location should run "displayRoute" method', (t) => {
        const btn = t.wrapper.find('.sat__route__btn');
        btn.simulate('click', { preventDefault() {}, stopPropagation() {} });

        expect(t.wrapper.instance().displayRoute.calledOnce);
        expect(t.wrapper.instance().props.directionsService.route.calledOnce);
    });
});

describe('Route Container', () => {
    it('should have mapStateToProps function', () => {
        const mapStateToProps = RouteContainer.__get__('mapStateToProps');
        expect(mapStateToProps).is.a('Function');
    });
});
