// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addLocation } from '../actions';
import { withGoogleMap } from '../map';

import Search from './search';

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {
    addLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(withGoogleMap(Search));
