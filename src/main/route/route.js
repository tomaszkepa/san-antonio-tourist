// @flow
import React, { Component } from 'react';
import type { List } from 'immutable';

import './route.scss';

type RouteStateType = {
    route: { [key: string]: Object },
}

type RoutePropsType = {
    locations: List,
    google: { [key: string]: Object },
    directionsService: { [key: string]: Object },
    directionsDisplay: { [key: string]: Object },
}

/**
 * Route component
 * @returns {Element} React element
 */
const Route = class extends Component {
    constructor(props: RoutePropsType) {
        super(props);

        this.state = {
            route: {},
        };
    }

    state: RouteStateType;

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
            locations.pop().shift().forEach((location: Object) => {
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
        }, (response: Object, status: string) => {
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

        const listItems = Object.keys(route).length ? route.legs.map((leg: Object, i: number) =>
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
                    disabled={this.props.locations.size < 2}
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
