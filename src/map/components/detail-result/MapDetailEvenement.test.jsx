import React from 'react';
import { shallow } from 'enzyme';

import MapDetailEvenement from './MapDetailEvenement';

describe('MapDetailEvenement', () => {
  it('should render everything', () => {
    const evenement = {
      titel: 'Bedrijfsinvesteringszone heffingLabel',
      startdatum: '12-12-2012',
      einddatum: '12-12-2012',
      url: 'https://evenement/link',
      label: 'Evenement label'
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailEvenement
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        item={evenement}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
