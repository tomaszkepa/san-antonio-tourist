import React, { Component } from 'react';

type LocationsPropsType = {
    locations: Object,
}

const Locations = class extends Component {
    constructor(props: LocationsPropsType, context) {
        super(props, context);
    }

    renderLocationList() {
        const locationList = [];

        this.props.locations.forEach((location, id) => {
            if (!location.place) {
                return;
            }

            locationList.push(<li key={id}>{location.place.formatted_address}</li>);
        });

        return locationList;
    }

    render() {
        return (
            <div>
                <button onClick={this.props.displayRoute(this.props.locations)}>displayRoute</button>
                <ul>
                    { this.renderLocationList() }
                </ul>
            </div>
        );
    }
};

export default Locations;
