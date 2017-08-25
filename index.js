import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>Demo</div>;

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
