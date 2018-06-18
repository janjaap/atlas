import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';

import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { Provider } from 'react-redux';


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

sagaMiddleware.run(rootSaga);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById('root')
  );
};

render();
