// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getLocations } from '../selectors';

import Locations from './locations';

const mapStateToProps = createStructuredSelector({
    locations: getLocations,
});

export default connect(mapStateToProps, null)(Locations);
