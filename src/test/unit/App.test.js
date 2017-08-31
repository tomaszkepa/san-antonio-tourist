import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import {
    expect,
    it,
    before,
} from '../common/test-base';

import App from '../../main/App';
import Search from '../../main/search';
import Locations from '../../main/locations';
import Route from '../../main/route';
import { GoogleMapProvider } from '../../main/map';

describe('<App />', () => {
    before((t, done) => {
        t.wrapper = shallow(<App />);
        done();
    });

    it('renders a <Provider /> component', (t) => {
        expect(t.wrapper.find(Provider)).to.have.length(1);
    });

    it('renders a <GoogleMapProvider /> component', (t) => {
        expect(t.wrapper.find(GoogleMapProvider)).to.have.length(1);
    });

    it('renders a <Search /> component', (t) => {
        expect(t.wrapper.find(Search)).to.have.length(1);
    });

    it('renders a <Locations /> component', (t) => {
        expect(t.wrapper.find(Locations)).to.have.length(1);
    });

    it('renders a <Route /> component', (t) => {
        expect(t.wrapper.find(Route)).to.have.length(1);
    });
});
