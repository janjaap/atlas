import React from 'react';
import AngularWrapper from './../angular-wrapper/AngularWrapper';

import { mockApiData } from '../../detail/services/grondexploitatie/graph-phased/detail-grondexploitatie-graph-phased.mock';

const Home = () => (
  <div className="page">
    <h1>Homepage</h1>
    <AngularWrapper
      isPanelVisible
      canClose
      moduleName={'dpHomePanel'}
    >
      <dp-panel is-panel-visible="isPanelVisible" can-close="canClose" />
    </AngularWrapper>
    <AngularWrapper
      data={mockApiData}
      moduleName={'dpHomeGraph'}
    >
      <dp-grex data="data" />
    </AngularWrapper>
  </div>
);


export default Home;
