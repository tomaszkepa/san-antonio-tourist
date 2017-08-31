import React from 'react';
import { mount } from 'enzyme';
import {
    expect,
    it,
} from '../common/test-base';

import { GoogleMapProvider } from '../../main/map';
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
});
