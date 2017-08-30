// @flow
import React, { Component } from 'react';
import { Search } from '../search';
import { Locations } from '../locations';
import { Route } from '../route';

type MainContainerPropsType = {
    addMarker: () => void,
    locations: Array,
};

/**
 * Main Container component
 * @returns {Element} React element
 */
class MainContainer extends Component {
    constructor(props: MainContainerPropsType) {
        super(props);
    }

    render() {
        // this.props.locations.forEach((position) => {
        //     this.props.addMarker({ position });
        // });

        return (
            <div>
                <Search {...this.props} />
                <Locations {...this.props} />

                <Route />
            </div>
        );
    }
}

export default MainContainer;

