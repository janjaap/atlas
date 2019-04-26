import React from 'react';
import { shallow } from 'enzyme';

import MapDetailResultStatusItem
  from './MapDetailResultStatusItem';

describe('MapDetailResultItem', () => {
  it('should render label and value', () => {
    const label = 'label';
    const value = 'value';
    const status = '';
    const wrapper = shallow(
      <MapDetailResultStatusItem
        label={label}
        value={value}
        status={status}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render empty value', () => {
    const label = 'label';
    const value = '';
    const status = '';
    const wrapper = shallow(
      <MapDetailResultStatusItem
        label={label}
        value={value}
        status={status}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render without value', () => {
    const label = 'label';
    const wrapper = shallow(
      <MapDetailResultStatusItem
        label={label}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a red bullet if status is `alert`', () => {
    const label = 'label';
    const value = 'value';
    const status = 'alert';
    const wrapper = shallow(
      <MapDetailResultStatusItem
        label={label}
        value={value}
        status={status}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a blue bullet if status is `info`', () => {
    const label = 'label';
    const value = 'value';
    const status = 'info';
    const wrapper = shallow(
      <MapDetailResultStatusItem
        label={label}
        value={value}
        status={status}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
