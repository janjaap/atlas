import React from 'react';
import { shallow } from 'enzyme';

import MapDetailResultUrlItem
  from './MapDetailResultUrlItem';


describe('MapDetailResultUrlItem', () => {
  it('should render the url ', () => {
    const label = 'label';
    const description = 'description';
    const link = 'link';
    const wrapper = shallow(
      <MapDetailResultUrlItem
        label={label}
        description={description}
        link={link}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
