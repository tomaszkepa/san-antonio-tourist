import React, { Component } from 'react';

import './locations.scss';

type LocationsPropsType = {
    locations: Object,
    displayRoute: () => void,
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
            <div className="sat__locations">
                <h4>Location list:</h4>
                <ul>
                    { this.renderLocationList() }
                </ul>
            </div>
        );
    }
};

export default Locations;
