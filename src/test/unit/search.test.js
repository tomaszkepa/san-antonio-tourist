import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import {
    expect,
    it,
    before,
    beforeEach,
    afterEach,
} from '../common/test-base';

import Search from '../../main/search/search';
import SearchContainer from '../../main/search/Container';

describe('<Search />', () => {
    before((t, done) => {
        t.wrapper = shallow(<Search/>);
        done();
    });

    it('renders a <Search /> component', (t) => {
        expect(t.wrapper.find('div').filter('.sat__search')).to.have.length(1);
    });
});

describe('<Search /> methods', () => {
    let l = null;
    const props = {
        addLocation: spy(),
    };

    beforeEach(() => {
        l = shallow(<Search {...props} />);
    });

    afterEach(() => {
        l = null;
    });

    it('should run "addLocation" method', () => {
        l.instance().addLocationHandler();
        expect(l.instance().props.addLocation.calledOnce);
    });
});

describe('Search Container', () => {
    it('should have mapDispatchToProps object', () => {
        const mapDispatchToProps = SearchContainer.__get__('mapDispatchToProps');
        expect(mapDispatchToProps).is.an('object');
    });

    it('should have mapDispatchToProps object with proper properties', () => {
        const mapDispatchToProps = SearchContainer.__get__('mapDispatchToProps');
        expect(mapDispatchToProps).to.have.property('addLocation').that.is.a('Function');
    });
});
