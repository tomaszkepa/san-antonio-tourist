// @flow
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Main from './Main';

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
