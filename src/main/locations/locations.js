// @flow
import React, { Component } from 'react';
import type { List } from 'immutable';

import './locations.scss';

type LocationsPropsType = {
    locations: List,
    displayRoute: () => void,
}

/**
 * Locations component
 * @returns {Element} React element
 */
const Locations = class extends Component {
    constructor(props: LocationsPropsType, context) {
        super(props, context);
    }

    render() {
        const { locations } = this.props;

        const listItems = locations ? locations.map((location, i) =>
            <li key={i} className="collection-item">
                {location.place.formatted_address}
            </li>
        ) : null;

        return (
            <div className="sat__locations">
                {
                    !!locations.size && (
                        <ul className="sat__locations__list collection with-header">
                            <li className="collection-header"><h5>Location list:</h5></li>
                            {listItems}
                        </ul>
                    )
                }
            </div>
        );
    }
};

export default Locations;
