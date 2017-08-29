// @flow
import React, { Component } from 'react';
import Search from '../search/search';

type MainContainerPropsType = {
    initMap: () => void,
};

/**
 * Main Container component
 * @returns {Element} React element
 */
class MainContainer extends Component {
    constructor(props: MainContainerPropsType) {
        super(props);
    }

    componentWillMount() {
        this.props.initMap();
    }


    render() {
        const pos = {
            lat: 29.4059225,
            lng: -98.4968012,
        };

        this.props.addMarker({ position: pos });

        return (
            <div>
                MainComponent

                <Search {...this.props} />
            </div>
        );
    }
}

export default MainContainer;
