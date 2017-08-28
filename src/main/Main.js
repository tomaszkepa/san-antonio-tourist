// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { END } from 'redux-saga';
import createStore from './store';

import { Panel } from './panel';
import { GoogleMapProvider } from './map';


const Main = class extends Component {
    constructor(props, context) {
        super(props, context);
        this.store = null;
    }

    componentWillMount() {
        this.store = createStore();
    }

    componentWillUnmount() {
        this.store.dispatch(END);
    }

    render() {
        return (
            <Provider store={this.store}>
                <GoogleMapProvider>
                    <Panel />
                </GoogleMapProvider>
            </Provider>
        );
    }
};

export default Main;
