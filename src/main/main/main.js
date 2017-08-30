// @flow
import React, { Component } from 'react';
import { Search } from '../search';
import { Locations } from '../locations';
import { Route } from '../route';

import './main.scss';

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
            <section>
                <Search />
                <section className="sat__details">
                    <Locations />
                    <Route />
                </section>
            </section>
        );
    }
}

export default MainContainer;

