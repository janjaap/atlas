import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';

import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import * as auth from '../shared/services/auth/auth';

import { authenticateUser } from '../reducers/user';
import { fetchCatalogFilters } from '../catalog/ducks/data-selection/data-selection-catalog';


import rootSaga from '../root-saga';
import App from './App';
import rootReducer from '../reducers/root-reducer';

const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    ),
  ),
);

window.reduxStore = store;

sagaMiddleware.run(rootSaga);

try {
  auth.initAuth();
} catch (error) {
  window.Raven.captureMessage(error);
}

const returnPath = auth.getReturnPath();
if (returnPath) {
  // Timeout needed because the change is otherwise not being handled in
  // Firefox browsers. This is possibly due to AngularJS changing the
  // `location.hash` at the same time.
  window.setTimeout(() => {
    location.hash = returnPath;
  });
}

const accessToken = auth.getAccessToken();
if (accessToken) {
  window.reduxStore.dispatch(authenticateUser(auth.getAccessToken(), auth.getName(),
    auth.getScopes()));
}

window.reduxStore.dispatch(fetchCatalogFilters());

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById('root')
  );
};

render();

(function(orig) {
    angular.modules = [];
    angular.module = function() {
        if (arguments.length > 1) {
            angular.modules.push(arguments[0]);
        }
        return orig.apply(null, arguments);
    }
})(angular.module);
