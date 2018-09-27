import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

import ReduxQuerySync from 'redux-query-sync'
import createStore from './store';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

const store = createStore(history);
window.store = store;


// store.listen(() => {
//   const state = store.getState();
//   const zoom = state.map.zoom;
//   location.
// });

ReduxQuerySync({
  store, // your Redux store
  params: {
    zoom: {
      // The selector you use to get the destination string from the state object.
      selector: state => state.map.zoom,
      // The action creator you use for setting a new destination.
      action: value => {
        console.log('zoom value from query ', value);
        if (!value) {
          return { type: 'NO_QUERY_ACTION' };
        }
        return {type: 'ZOOM_QUERY', payload: value};
      },
      defaultValue: store.getState().map.zoom
    },
    //
    // Same logic for lat & lng
    //
  },
  replaceState: true,
  // Initially set the store's state to the current location.
  initialTruth: 'location',
  history // use same history object as the rest of the code
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
