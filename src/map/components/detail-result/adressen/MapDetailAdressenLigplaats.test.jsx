import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenLigplaats from './MapDetailAdressenLigplaats';

describe('MapDetailAdressenLigplaats', () => {
  it('should render everything', () => {
    const ligplaats = {
      label: 'Ligplaats label',
      status: { description: 'description', code: '18' }
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenLigplaats
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        ligplaats={ligplaats}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
