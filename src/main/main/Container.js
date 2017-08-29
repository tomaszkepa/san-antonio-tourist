// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import MainContainer from './main';
import { withGoogleMap } from '../map/index';
import { getLocations } from '../selectors';

const mapStateToProps = createStructuredSelector({
    locations: getLocations,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withGoogleMap(MainContainer));
