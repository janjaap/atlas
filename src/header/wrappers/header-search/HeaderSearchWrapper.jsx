import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

import SearchContainer from '../../containers/header-search/HeaderSearchContainer';

const HeaderSearchWrapper = () => (
  <Provider store={window.reduxStore}>
    <SearchContainer />
  </Provider>
);

export default HeaderSearchWrapper;

window.React = window.React || React;
window.render = window.render || render;
window.SearchWrapper = HeaderSearchWrapper;
