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
            map: null,
            google: null,
        };
    }

    getChildContext() {
        console.log('***getChildContext***');
        return {
            addMarker: (data) => this.addMarker(data),
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
            const maps = window.google.maps;
            const center = new maps.LatLng(lat, lng);

            this.setState({
                loadedMap: true,
                map: new maps.Map(this.mapRef, {
                    center,
                    zoom,
                }),
                google: window.google,
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
            <div>
                { this.state.map && this.props.children }
                <div ref={ref => (this.mapRef = ref)} style={style}>
                    Loading map...
                </div>
            </div>
        );
    }
}

export default GoogleMapProvider;
