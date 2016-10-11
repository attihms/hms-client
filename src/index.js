import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';

// import style from './style/style.css';
import Root from './containers/root';
import store from './store';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render(
    <Root store={ store() } history={ browserHistory } />
    , document.getElementById('root')
);
