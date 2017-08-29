// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Search from './search';

const mapStateToProps = createStructuredSelector({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
