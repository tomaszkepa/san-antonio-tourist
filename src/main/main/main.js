// @flow
import React, { Component } from 'react';

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
        return (
            <div>MainContainer</div>
        );
    }
}

export default MainContainer;

