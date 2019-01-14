import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import App from './App';
import configureStore from '../store/store';
import './angularModules';
import routes from './routes';
import resolveLegacyRoutes from './legacy-routes';

const history = createHistory();
const store = configureStore(history, routes);

window.reactHistory = history;

/* eslint-disable no-undef,no-console */
console.log(`CityData: version: ${VERSION}, build: ${__BUILD_ID__}`);
if (BRANCH !== 'master') {
  console.log(`          branch: ${BRANCH}`);
}
/* eslint-enable no-undef,no-console */

resolveLegacyRoutes();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
