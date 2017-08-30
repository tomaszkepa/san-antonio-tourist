// @flow
import React, { Component } from 'react';
import { Search } from '../search';
import { Locations } from '../locations';
import { Route } from '../route';

type MainContainerPropsType = {
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
        return (
            <div>
                <Search/>
                <Locations />
                <Route />
            </div>
        );
    }
}

export default MainContainer;

