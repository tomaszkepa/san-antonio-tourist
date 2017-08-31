/* eslint global-require: 0 */

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
    const { Iterable } = require('immutable');
    const { createLogger } = require('redux-logger');

    const logger = createLogger({
        stateTransformer: (state) => {
            if (Iterable.isIterable(state)) {
                return state.toJS();
            }
            return state;
        },
    });

    middlewares.push(logger);
}

export default middlewares;
