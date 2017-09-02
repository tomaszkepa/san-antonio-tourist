/* eslint no-underscore-dangle: 0 */

// @flow
import React, { Component } from 'react';

import './search.scss';

type PositionType = {
    place: { [key: string]: Object },
    lat: null | number,
    lng: null | number,
}

type SearchStateType = {
    inputValue: string,
    position: PositionType,
}

type SearchPropsType = {
    addLocation: () => void,
    google: { [key: string]: Object },
    map: { [key: string]: Object },
}

/**
 * Search component
 * @returns {Element} React element
 */
const Search = class extends Component {
    constructor(props: SearchPropsType) {
        super(props);

        this.initialState = {
            inputValue: '',
            position: {
                place: {},
                lat: null,
                lng: null,
            },
        };

        this.state = this.initialState;
    }

    state: SearchStateType;
    initialState: SearchStateType;
    autocompleteRef: ?HTMLInputElement;

    componentDidMount() {
        this.initAutoComplete();
    }

    initAutoComplete() {
        const markers = [];
        const { google, map } = this.props;

        if (!google || !map) {
            return;
        }

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
                inputValue: autocomplete.gm_accessors_.place.Gc.formattedPrediction,
                position: {
                    place,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                },
            });
        });
    }

    addLocationHandler() {
        this.props.addLocation(this.state.position);
        this.setState(this.initialState);
    }

    changeHandler(e: Object) {
        this.setState({ inputValue: e.target.value });
    }

    render() {
        const {
            inputValue,
            position,
        } = this.state;

        return (
            <div className="sat__search">
                <form
                    className="sat__search__form"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        ref={ref => (this.autocompleteRef = ref)}
                        onChange={(e) => this.changeHandler(e)}
                        value={inputValue}
                        type="text"
                        placeholder="Enter a location"
                        className="sat__search__form__input"
                    />
                </form>

                <button
                    onClick={() => this.addLocationHandler()}
                    disabled={!Object.keys(position.place).length}
                    className="sat__search__form__btn waves-effect waves-light btn-large"
                >
                    Add Location
                </button>
            </div>
        );
    }
};

export default Search;
