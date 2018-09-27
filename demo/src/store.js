import { connectRoutes } from 'redux-first-router'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import pageReducer from './reducers/page';
import mapReducer from './reducers/map';

import routesMap from './routes-map';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (history) => {
  const { reducer, middleware, enhancer } = connectRoutes(history, routesMap); // yes, 3 redux aspects

  const rootReducer = combineReducers({
    location: reducer,
    page: pageReducer,
    map: mapReducer
  });
  const middlewares = applyMiddleware(middleware);

  // note the order: enhancer, then middlewares
  const store = createStore(rootReducer, composeEnhancers(enhancer, middlewares));
  return store;
}
