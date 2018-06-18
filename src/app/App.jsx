import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import routes from './routes';
import './_app.scss';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    { routes }
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default App;
