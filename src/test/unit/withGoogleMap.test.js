import React from 'react';
import { mount } from 'enzyme';
import {
    expect,
    it,
} from '../common/test-base';

import { withGoogleMap } from '../../main/map';

describe('withGoogleMap', () => {
    class Child extends React.Component {
        render() {
            return null;
        }
    }

    const context = {
        directionsService: {},
        directionsDisplay: {},
        google: {},
        map: {},
    };

    const ChildWithGoogleMap = withGoogleMap(Child);
    const wrapper = mount(<ChildWithGoogleMap />, { context });

    it('component wrapped by withGoogleMap function should have proper name', () => {
        expect(wrapper.name()).to.equal('withGoogleMap(Child)');
    });

    it('component should have "directionsService" props from context', () => {
        const { directionsService: child } = wrapper.find(Child).props();
        expect(child).to.be.equal(context.directionsService);
    });

    it('component should have "directionsDisplay" props from context', () => {
        const { directionsDisplay: child } = wrapper.find(Child).props();
        expect(child).to.be.equal(context.directionsDisplay);
    });

    it('component should have "google" props from context', () => {
        const { google: child } = wrapper.find(Child).props();
        expect(child).to.be.equal(context.google);
    });

    it('component should have "map" props from context', () => {
        const { map: child } = wrapper.find(Child).props();
        expect(child).to.be.equal(context.map);
    });
});
