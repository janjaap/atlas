import React from 'react';
import PropTypes from 'prop-types';
import angular from 'angular';
import { reactAngularModule } from 'react-angular';

import { ConnectedRouter } from 'connected-react-router';
import routes from './routes';

angular.module('dpAtlas', []);
require('./angular/panel/panel.component');
require('./angular/grex/grex.component');
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
