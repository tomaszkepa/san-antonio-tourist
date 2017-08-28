import {
    compose,
    getContext,
    setDisplayName,
    wrapDisplayName,
} from 'recompose';

import contextTypes from './contextTypes';

/**
 * Higher order component, that wraps other components to provide google maps functions to their props
 * @param {React.Element<*>} wrappedComponent Component that need to use google maps
 * @returns {React.Element<*>} A react element
 */
const withGoogleMap = (wrappedComponent) => compose(
    setDisplayName(wrapDisplayName(wrappedComponent, 'withGoogleMap')),
    getContext(contextTypes),
)(wrappedComponent);

export default withGoogleMap;
