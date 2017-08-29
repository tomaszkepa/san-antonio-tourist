import React from 'react';
import $script from 'scriptjs';
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
            displayRoute: (data) => this.displayRoute(data),
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

    displayRoute(data: { [key: string]: string }) {
        const testData = [
            {
                location: 'montreal, quebec',
                stopover: true,
            }, {
                location: 'toronto, ont',
                stopover: true,
            },
        ];

        // new google.maps.LatLng(45.658197,-73.636333)
        // location: new google.maps.LatLng(45.658197,-73.636333),

        const {
            origin = 'Halifax, NS', // from
            destination = 'Miami, FL', // to
            waypoints = testData,
            optimizeWaypoints = true,
            travelMode = 'DRIVING',
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
                const route = response.routes.shift();
            } else {
                window.alert('Directions request failed');
            }
        });
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
