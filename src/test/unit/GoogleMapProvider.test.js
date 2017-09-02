import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import {
    expect,
    it,
} from '../common/test-base';


import {
    GoogleMapProvider,
    // __RewireAPI__ as RewireAPI,
} from '../../main/map';
import contextTypes from '../../main/map/contextTypes';

describe('GoogleMapProvider', () => {
    class Child extends React.Component {
        render() {
            return null;
        }
    }

    Child.contextTypes = contextTypes;

    const wrapper = mount(
        <GoogleMapProvider>
            <Child />
        </GoogleMapProvider>
    );

    context('While render GoogleMapProvider:', () => {
        it('should have "children" props', () => {
            expect(wrapper.props().children).to.be.an('object');
        });
    });

    it('should have "children" props', () => {
        it('calls componentDidMount', () => {
            spy(GoogleMapProvider.prototype, 'componentDidMount');
            mount(<GoogleMapProvider />);
            expect(GoogleMapProvider.prototype.componentDidMount).to.have.property('callCount', 1);
            GoogleMapProvider.prototype.componentDidMount.restore();
        });
    });
});
