import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import $script from 'scriptjs';
import contextTypes from './contextTypes';

/**
 * Provides 'initMap' to those child components which are wrapped with 'withGoogleMap' decorator
 * @returns {React.Element<*>} A react element
 */
class GoogleMapProvider extends React.Component {
    static propTypes = {
        apiKey: PropTypes.string,
        children: PropTypes.element.isRequired,
    };

    static childContextTypes = contextTypes;

    constructor(props, context) {
        super(props, context);

        this.state = {
            loaded: false,
            map: null,
            google: null,
        };
    }

    componentWillMount() {
        const key = this.props.apiKey || 'AIzaSyC2VNAnZeX5Tu7-MBPm7h3XRs_GiEIQXQM';
        $script(`https://maps.googleapis.com/maps/api/js?key=${key}`, 'GoogleMaps');
    }

    componentDidMount() {
        const refs = this.refs;

        $script.ready('GoogleMaps', () => {
            const maps = window.google.maps;
            const props = Object.assign({}, this.props, {
                loaded: this.state.loaded,
            });

            const mapRef = refs.map;

            let zoom = 14;
            let lat = 37.774929;
            let lng = -122.419416;

            const node = ReactDOM.findDOMNode(mapRef);
            let center = new maps.LatLng(lat, lng);

            let mapConfig = {
                center, zoom: zoom,
            };

            this.map = new maps.Map(node, mapConfig);

            this.setState({
                loaded: true,
                map: this.map,
                google: window.google,
            });
        });
    }

    getChildContext() {
        return {
            loaded: this.state.loaded,
            map: this.state.map,
            google: this.state.google,
            mapComponent: this.refs.map
        };
    }

    render() {
        const style = {
            width: '100vw',
            height: '100vh',
        };

        return (
            <div>
                { this.props.children }
                <div ref='map' style={style} />
            </div>
        );
    }
}

export default GoogleMapProvider;
