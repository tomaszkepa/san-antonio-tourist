import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './src/main';

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);


if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        // $FlowIssue Enable Webpack hot module replacement for reducers
        module.hot.accept();
    }
}
