// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { END } from 'redux-saga';
import createStore from './store';

import { GoogleMapProvider } from './map';
import { MainContainer } from './main';

const App = class extends Component {
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
                    <MainContainer />
                </GoogleMapProvider>
            </Provider>
        );
    }
};

export default App;
