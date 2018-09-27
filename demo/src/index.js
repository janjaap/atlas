import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

import createStore from './store';
// import './router';

import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const store = createStore(history);
window.store = store;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
