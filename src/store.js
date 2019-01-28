import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';

import rootSaga from './root-saga';
import './shared/ducks/error-message';
import './map/ducks/click-location/map-click-location';
import * as auth from './shared/services/auth/auth';
import { authenticateUser } from './reducers/user';
import { fetchCatalogFilters } from './catalog/ducks/data-selection/data-selection-catalog';
import rootReducer from './reducers/root';
import stateUrlConverter from './shared/services/routing/state-url-converter';
import { isDevelopment } from './shared/environment';
import freeze from './shared/services/freeze/freeze';
import contextMiddleware from './shared/services/context/context-middleware';
import stateToUrlMiddleware from './shared/services/state-to-url/state-to-url-middleware';
import locationHandlerCreator from './location-handler';

window.reducer = rootReducer;

const urlDefaultState = stateUrlConverter.getDefaultState();
const defaultState = isDevelopment() ? freeze(urlDefaultState) : urlDefaultState;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const enhancer = composeEnhancers(
  applyMiddleware(contextMiddleware, stateToUrlMiddleware, sagaMiddleware)
);

window.reduxStore = createStore(rootReducer, defaultState, enhancer);

sagaMiddleware.run(rootSaga);

try {
  auth.initAuth();
} catch (error) {
  window.Raven.captureMessage(error);
}

const returnPath = auth.getReturnPath();
if (returnPath) {
  location.hash = returnPath;
}

const accessToken = auth.getAccessToken();
if (accessToken) {
  window.reduxStore.dispatch(authenticateUser(auth.getAccessToken(), auth.getName(),
    auth.getScopes()));
}

window.reduxStore.dispatch(fetchCatalogFilters());

const history = createHistory();
const locationHandler = locationHandlerCreator(window.reduxStore);
// eslint-disable-next-line no-unused-vars
const unlisten = history.listen(locationHandler);
// Handle first page load URL
locationHandler(window.location);
