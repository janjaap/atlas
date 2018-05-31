import React from 'react';
import { shallow } from 'enzyme';

import MapDetailAdressenVerblijfsobject from './MapDetailAdressenVerblijfsobject';

describe('MapDetailAdressenVerblijfsobject', () => {
  it('should render everything', () => {
    const verblijfsobject = {
      eigendomsverhouding: 'Verblijfsobject eigendomsverhouding',
      gebruiksdoelen: [{
        code: '01',
        description: 'Gebruiksdoel description 1'
      }, {
        code: '0400',
        description: 'Gebruiksdoel description 2',
        descriptionPlus: 'Gebruiksdoel description plus'
      }],
      label: 'Verblijfsobject label',
      size: 15,
      type: 'Verblijfsobject type',
      status: {
        description: 'Status omschrijving',
        code: '15'
      },
      hoofdadres: {
        hoofdadres: true
      }
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenVerblijfsobject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        verblijfsobject={verblijfsobject}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render unknown with zero value for size', () => {
    const verblijfsobject = {
      eigendomsverhouding: 'Verblijfsobject eigendomsverhouding',
      gebruiksdoelen: [{
        code: '01',
        description: 'Gebruiksdoel description 1'
      }, {
        code: '0400',
        description: 'Gebruiksdoel description 2',
        descriptionPlus: 'Gebruiksdoel description plus'
      }],
      label: 'Verblijfsobject label',
      size: 0,
      type: 'Verblijfsobject type',
      status: {
        description: 'Status omschrijving',
        code: '15'
      },
      hoofdadres: {
        hoofdadres: true
      }
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenVerblijfsobject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        verblijfsobject={verblijfsobject}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render unknown without size', () => {
    const verblijfsobject = {
      eigendomsverhouding: 'Verblijfsobject eigendomsverhouding',
      gebruiksdoelen: [{
        code: '01',
        description: 'Gebruiksdoel description 1'
      }, {
        code: '0400',
        description: 'Gebruiksdoel description 2',
        descriptionPlus: 'Gebruiksdoel description plus'
      }],
      label: 'Verblijfsobject label',
      type: 'Verblijfsobject type',
      status: {
        description: 'Status omschrijving',
        code: '15'
      },
      hoofdadres: {
        hoofdadres: true
      }
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenVerblijfsobject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        verblijfsobject={verblijfsobject}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render `Nee` if hoofdadres is `false` and show a blue bullet', () => {
    const verblijfsobject = {
      eigendomsverhouding: 'Verblijfsobject eigendomsverhouding',
      gebruiksdoelen: [{
        code: '01',
        description: 'Gebruiksdoel description 1'
      }, {
        code: '0400',
        description: 'Gebruiksdoel description 2',
        descriptionPlus: 'Gebruiksdoel description plus'
      }],
      label: 'Verblijfsobject label',
      type: 'Verblijfsobject type',
      status: {
        description: 'Status omschrijving',
        code: '15'
      },
      hoofdadres: {
        hoofdadres: false
      }
    };
    const clickHandler = jest.fn();
    const wrapper = shallow(
      <MapDetailAdressenVerblijfsobject
        panoUrl="panoUrl"
        onMaximize={clickHandler}
        onPanoPreviewClick={clickHandler}
        verblijfsobject={verblijfsobject}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
