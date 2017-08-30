// @flow
import React, { Component } from 'react';
import { Search } from '../search';
import { Locations } from '../locations';

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
        this.props.locations.forEach((position) => {
            this.props.addMarker({ position });
        });

        return (
            <div>
                MainComponent
                <Locations {...this.props} />
                <Search {...this.props} />
            </div>
        );
    }
}

export default MainContainer;

