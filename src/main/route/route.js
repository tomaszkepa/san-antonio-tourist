// @flow
import React, { Component } from 'react';

import './route.scss';

type RoutePropsType = {
    locations: { [key: string]: any },
    google: { [key: string]: any },
    directionsService: { [key: string]: any },
    directionsDisplay: { [key: string]: any },
}

/**
 * Route component
 * @returns {Element} React element
 */
const Route = class extends Component {
    constructor(props: RoutePropsType) {
        super(props);

        this.state = {
            route: null,
        };
    }

    displayRoute() {
        const {
            locations,
            directionsService,
            directionsDisplay,
        } = this.props;

        const from = locations.get(0);
        const to = locations.get(-1);
        const stops = [];

        if (locations.size > 2) {
            locations.pop().shift().forEach((location) => {
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
        } = locations || {};

        directionsService.route({
            origin,
            destination,
            waypoints,
            optimizeWaypoints,
            travelMode,
        }, (response, status) => {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                this.setState({
                    route: response.routes.shift(),
                });

                console.log(this.state.route);
            } else {
                window.alert('Directions request failed');
            }
        });
    }

    render() {
        const { route } = this.state;

        const listItems = route ? route.legs.map((leg, i) =>
            <li key={i} className="collection-item">
                <p><b>Route Segment {i + 1}:</b></p>
                <b>From:</b> {leg.start_address}<br />
                <b>To:</b> {leg.end_address}<br />
                <b>Distance:</b> {leg.distance.text}<br />
                <b>Duration:</b> {leg.duration.text}<br />
            </li>
        ) : null;

        return (
            <div className="sat__route">
                <button
                    className="sat__route__btn waves-effect waves-light btn-large"
                    onClick={() => this.displayRoute()}
                    disabled={this.props.locations.size < 1}
                >
                    Display Route
                </button>

                {
                    !!route && (
                        <div className="sat__route__list">
                            <ul className="collection">
                                {listItems}
                            </ul>
                        </div>
                    )
                }
            </div>
        );
    }
};

export default Route;
