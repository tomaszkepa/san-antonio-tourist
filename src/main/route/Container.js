// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { withGoogleMap } from '../map';
import { getLocations } from '../selectors';

import Route from './route';

const mapStateToProps = createStructuredSelector({
    locations: getLocations,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withGoogleMap(Route));

