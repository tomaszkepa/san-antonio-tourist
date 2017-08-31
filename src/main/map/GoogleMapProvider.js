/* eslint new-parens: 0 */

// @flow
import React, { Component } from 'react';
import $script from 'scriptjs';
import contextTypes from './contextTypes';

import './google-map-provider.scss';

type GoogleMapProviderStateType = {
    loadedMap: boolean,
    directionsService: { [key: string]: Object },
    directionsDisplay: { [key: string]: Object },
    map: { [key: string]: Object },
    google: { [key: string]: Object },
}

type GoogleMapProviderPropsType = {
    apiKey?: String,
    zoom?: Number,
    lat?: Number,
    lng?: Number,
    children: Element<*>,
}

/**
 * Provides 'google' and 'map' to those child components which are wrapped with 'withGoogleMap' decorator
 * @returns {React.Element<*>} A react element
 */
const GoogleMapProvider = class extends Component {
    static childContextTypes = contextTypes;

    constructor(props: GoogleMapProviderPropsType) {
        super(props);

        this.state = {
            loadedMap: false,
            directionsService: {},
            directionsDisplay: {},
            map: {},
            google: {},
        };
    }

    state: GoogleMapProviderStateType;
    mapRef: ?HTMLElement;

    getChildContext() {
        return {
            directionsService: this.state.directionsService,
            directionsDisplay: this.state.directionsDisplay,
            google: this.state.google,
            map: this.state.map,
        };
    }

    componentWillMount() {
        const key = this.props.apiKey || 'AIzaSyC2VNAnZeX5Tu7-MBPm7h3XRs_GiEIQXQM';
        $script(`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`, 'GoogleMaps');
    }

    componentDidMount() {
        if (this.state.loadedMap) {
            return;
        }

        const {
            zoom = 10,
            lat = 29.4059225,
            lng = -98.4968012,
        } = this.props;

        $script.ready('GoogleMaps', () => {
            const google = window.google || {};
            const center = new google.maps.LatLng(lat, lng);
            const directionsService = new google.maps.DirectionsService;
            const directionsDisplay = new google.maps.DirectionsRenderer;

            const map = new google.maps.Map(this.mapRef, {
                center,
                zoom,
            });

            directionsDisplay.setMap(map);

            this.setState({
                loadedMap: true,
                directionsService,
                directionsDisplay,
                google,
                map,
            });
        });
    }

    render() {
        return (
            <section className="sat__container">
                <section className="sat__container__content">
                    { this.state.loadedMap && this.props.children }
                </section>
                <section ref={ref => (this.mapRef = ref)} className="sat__container__map">
                    Loading map...
                </section>
            </section>
        );
    }
};

export default GoogleMapProvider;
