import React from 'react';
import { shallow } from 'enzyme';
import ActiveFilters from './ActiveFilters';

// Todo: add more tests
describe('ActiveFilters', () => {
  it('should render', () => {
    const component = shallow(
      <ActiveFilters
        filters={[{ label: 'Stadsdeel', slug: 'stadsdeel_naam', options: 'Centrum' }]}
        removeFilter={() => {
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});