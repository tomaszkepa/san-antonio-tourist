import React from 'react';
import $script from 'scriptjs';
import { List } from 'immutable';
import contextTypes from './contextTypes';

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
class GoogleMapProvider extends React.Component {
    static childContextTypes = contextTypes;

    constructor(props: GoogleMapProviderPropsType) {
        super(props);

        this.state = {
            loadedMap: false,
            directionsService: null,
            directionsDisplay: null,
            map: null,
            google: null,
        };
    }

    getChildContext() {
        console.log('***getChildContext***');
        return {
            addMarker: (data) => this.addMarker(data),
            displayRoute: (data) => () => this.displayRoute(data),
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

    displayRoute(data: List) {
        const from = data.get(0);
        const to = data.get(-1);
        const stops = [];

        if (data.size > 2) {
            data.pop().shift().forEach((location) => {
                stops.push({
                    location: location.place.geometry.location,
                    stopover: true,
                });
            });
        }

        const {
            origin = from,
            destination = to,
            waypoints = stops,
            optimizeWaypoints = true,
            travelMode = 'WALKING',
        } = data || {};

        this.state.directionsService.route({
            origin,
            destination,
            waypoints,
            optimizeWaypoints,
            travelMode,
        }, (response, status) => {
            if (status === 'OK') {
                this.state.directionsDisplay.setDirections(response);
                console.log(response.routes.shift());
            } else {
                window.alert('Directions request failed');
            }
        });
    }

    addMarker(config: { [key: string]: Object }) {
        const {
            map,
            google,
            loadedMap,
        } = this.state;

        if (!google || !loadedMap) {
            return;
        }

        let { position } = config;
        const { mapCenter } = config;
        const pos = position || mapCenter;

        if (!(pos instanceof google.maps.LatLng)) {
            position = new google.maps.LatLng(pos.lat, pos.lng);
        }

        this.marker = new google.maps.Marker(Object.assign({}, config, {
            map,
            position,
        }));
    }

    render() {
        const style = {
            width: '100vw',
            height: '50vh',
        };

        return (
            <section>
                <section style={style}>
                    { this.state.map && this.props.children }
                </section>
                <section ref={ref => (this.mapRef = ref)} style={style}>
                    Loading map...
                </section>
            </section>
        );
    }
}

export default GoogleMapProvider;
