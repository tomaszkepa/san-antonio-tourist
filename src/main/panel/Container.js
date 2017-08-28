// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Panel from './panel';
import { withGoogleMap } from '../map/index';

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withGoogleMap(Panel));
