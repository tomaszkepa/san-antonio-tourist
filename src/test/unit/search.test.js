import React from 'react';
import { shallow, mount } from 'enzyme';
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
        t.wrapper = shallow(<Search />);
        done();
    });

    it('renders a <Search /> component', (t) => {
        expect(t.wrapper.find('.sat__search')).to.have.length(1);
        expect(t.wrapper.find('.sat__search__form')).to.have.length(1);
        expect(t.wrapper.find('.sat__search__form__input')).to.have.length(1);
        expect(t.wrapper.find('.sat__search__form__btn')).to.have.length(1);
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

    it('search location should run "addLocation" method', () => {
        const btn = l.find('.sat__search__form__input');
        btn.simulate('click', { preventDefault() {}, stopPropagation() {} });
        expect(l.instance().props.addLocation.calledOnce);
    });

    it('add location button should run "changeHandler" method', () => {
        l.instance().changeHandler = spy();

        const btn = l.find('.sat__search__form__btn');
        btn.simulate('click', { preventDefault() {}, stopPropagation() {} });
        expect(l.instance().changeHandler.calledOnce);
    });
});

describe('Search initAutoComplete', () => {
    let l = null;

    beforeEach(() => {
        spy(Search.prototype, 'componentDidMount');
        l = mount(<Search />);
    });

    afterEach(() => {
        Search.prototype.componentDidMount.restore();
        l = null;
    });

    it('calls componentDidMount', () => {
        expect(Search.prototype.componentDidMount).to.have.property('callCount', 1);
    });

    it('calls componentDidMount', () => {
        l.instance().initAutoComplete = spy();
        expect(l.instance().initAutoComplete.calledOnce);
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
