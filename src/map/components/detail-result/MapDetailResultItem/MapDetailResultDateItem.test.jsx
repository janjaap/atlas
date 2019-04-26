import React from 'react';
import { shallow } from 'enzyme';

import MapDetailResultDateItem
  from './MapDetailResultDateItem';
import formatDate from '../../../../shared/services/date-formatter/date-formatter';

jest.mock('../../../../shared/services/date-formatter/date-formatter');

describe('MapDetailResultDateItem', () => {
  it('should render label and date', () => {
    formatDate.mockReturnValue('21 september 1980');
    const label = 'label';
    const date = new Date('1980-09-21');
    const wrapper = shallow(
      <MapDetailResultDateItem
        label={label}
        date={date}
      />
    );
    expect(formatDate).toHaveBeenCalledWith(date);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render future date', () => {
    formatDate.mockReturnValue('1 december 2029');
    const label = 'label';
    const date = new Date('2029-12-01');
    const wrapper = shallow(
      <MapDetailResultDateItem
        label={label}
        date={date}
      />
    );
    expect(formatDate).toHaveBeenCalledWith(date);
    expect(wrapper).toMatchSnapshot();
  });
});
