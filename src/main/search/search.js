import React, { Component } from 'react';

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
            <div>
                <div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            ref={ref => (this.autocompleteRef = ref)}
                            type="text"
                            placeholder="Enter a location"
                        />

                        <input type="submit" value="Go" />
                    </form>

                    <div>
                        <p>{this.state.position.lat}</p>
                        <p>{this.state.position.lng}</p>
                        <button onClick={() => this.addLocation()}>Add Location</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Search;
