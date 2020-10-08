import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'pages/home/Home.js';
import './index.css';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Root>
        <Home />
    </Root>,
    document.getElementById('root'),
);

serviceWorker.unregister();
