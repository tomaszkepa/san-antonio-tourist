// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addLocation } from '../actions';

import Search from './search';

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {
    addLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
