// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getLocations } from '../selectors';
import { addLocation } from '../actions';

import Locations from './locations';

const mapStateToProps = createStructuredSelector({
    locations: getLocations,
});
const mapDispatchToProps = {
    addLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
