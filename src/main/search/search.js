import React, { Component } from 'react';

import './search.scss';

type SearchPropsType = {
    addLocation: () => void,
    google: Object,
    map: Object,
}

const Search = class extends Component {
    constructor(props: SearchPropsType, context) {
        super(props, context);
        this.state = {
            position: {
                place: null,
                lat: null,
                lng: null,
            },
        };
    }

    componentDidMount() {
        this.initAutoComplete();
    }

    initAutoComplete() {
        const markers = [];
        const { google, map } = this.props;
        const autocomplete = new google.maps.places.Autocomplete(this.autocompleteRef);

        autocomplete.bindTo('bounds', map);
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (!place.geometry) {
                return;
            }

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(11);
            }

            // Clear out the old markers.
            markers.forEach((marker) => {
                markers.pop();
                marker.setMap(null);
            });

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map,
                position: place.geometry.location,
            }));

            this.setState({
                position: {
                    place,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                },
            });
        });
    }

    addLocation() {
        this.props.addLocation(this.state.position);

        this.setState({
            position: {
                place: null,
                lat: null,
                lng: null,
            },
        });
    }

    render() {
        return (
            <div className="sat__search">
                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        ref={ref => (this.autocompleteRef = ref)}
                        type="text"
                        placeholder="Enter a location"
                        className="sat__search__input"
                    />
                </form>

                <button onClick={() => this.addLocation()} disabled={!this.state.position.place}>Add Location</button>
            </div>
        );
    }
};

export default Search;
