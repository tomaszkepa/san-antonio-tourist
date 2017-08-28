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
 * Provides 'initMap' to those child components which are wrapped with 'withGoogleMap' decorator
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
        return {
            initMap: () => this.initMap(),
        };
    }

    componentWillMount() {
        const key = this.props.apiKey || 'AIzaSyC2VNAnZeX5Tu7-MBPm7h3XRs_GiEIQXQM';
        $script(`https://maps.googleapis.com/maps/api/js?key=${key}`, 'GoogleMaps');
    }

    initMap(config: { [key: string]: number }) {
        if (this.state.loadedMap) {
            return;
        }

        const {
            zoom = 10,
            lat = 29.4059225,
            lng = -98.4968012,
        } = config || {};

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


    render() {
        const style = {
            width: '50vw',
            height: '50vh',
        };

        return (
            <div>
                {React.cloneElement(this.props.children, { ...this.state })}
                <div ref={ref => (this.mapRef = ref)} style={style}>
                    Loading map...
                </div>
            </div>
        );
    }
}

export default GoogleMapProvider;
