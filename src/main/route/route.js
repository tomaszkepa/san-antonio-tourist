import React, { Component } from 'react';

import './route.scss';

type RoutePropsType = {
    locations: Object,
    google: Object,
    directionsService: Object,
    directionsDisplay: Object,
}

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

    renderRoute() {
        const routeList = [];
        this.state.route.legs.forEach((leg, i) => {
            routeList.push(
                <div key={i}>
                    <p><b>Route Segment {i + 1}:</b></p>
                    <b>From:</b> {leg.start_address}<br />
                    <b>To:</b> {leg.end_address}<br />
                    <b>Distance:</b> {leg.distance.text}<br />
                    <b>Duration:</b> {leg.duration.text}<br />
                    <hr />
                </div>
            );
        });

        return routeList;
    }

    render() {
        return (
            <div className="sat__route">
                <button
                    className="sat__route__btn"
                    onClick={() => this.displayRoute()}
                    disabled={this.props.locations.size < 1}
                >
                    Display Route
                </button>

                <div className="sat__route__list">
                    {this.state.route && this.renderRoute()}
                </div>
            </div>
        );
    }
};

export default Route;
