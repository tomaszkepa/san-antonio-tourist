import React, { Component } from 'react';

type SearchPropsType = {
    google: Object,
    map: Object,
}

const Search = class extends Component {
    constructor(props: SearchPropsType, context) {
        super(props, context);
        this.state = {
            place: null,
            position: null,
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
                map.setZoom(12);
            }

            this.setState({
                place,
                position: place.geometry.location,
            });
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
                </div>
            </div>
        );
    }
};

export default Search;
