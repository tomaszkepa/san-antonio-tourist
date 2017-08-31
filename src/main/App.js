// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { END } from 'redux-saga';
import createStore from './store';

import { GoogleMapProvider } from './map';
import { Search } from './search';
import { Locations } from './locations';
import { Route } from './route';

import './main.scss';

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
                    <Search />
                    <section className="sat__details">
                        <Locations />
                        <Route />
                    </section>
                </GoogleMapProvider>
            </Provider>
        );
    }
};

export default App;
