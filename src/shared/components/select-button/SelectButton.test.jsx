import React from 'react';
import { mount, shallow } from 'enzyme';

import SelectButton from './SelectButton';
import Icon from '../../../../public/images/icon-aerial.svg';

const options = [
  {
    value: 'topografie',
    label: 'Topografie'
  }, {
    value: 'topo_rd_light',
    label: 'Topografie licht'
  }, {
    value: 'topo_rd_zw',
    label: 'Topografie grijs'
  }
];

describe('SelectButton', () => {
  it('should trigger callback when clicked', () => {
    const handleChange = jest.fn();

    const wrapper = mount(
      <SelectButton
        className="someclass"
        handleChange={handleChange}
        icon={Icon}
        isDisabled={false}
        name="topography"
        options={options}
      />
    );

    wrapper.find('button.select-button__wrapper').simulate('click');
    expect(handleChange).toHaveBeenLastCalledWith('topografie');
  });

  it('should open the options list when open icon is clicked', () => {
    const wrapper = mount(
      <SelectButton
        className="someclass"
        icon={Icon}
        isDisabled={false}
        name="topography"
        options={options}
      />
    );

    expect(wrapper.find('.select-button.select-button--expanded').exists()).toBe(false);
    wrapper.find('button.select-button__icon-wrapper').simulate('click');
    expect(wrapper.find('.select-button.select-button--expanded').exists()).toBe(true);
  });

  it('should trigger callback and close when an option is clicked', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <SelectButton
        className="someclass"
        handleChange={handleChange}
        icon={Icon}
        isDisabled={false}
        name="topography"
        options={options}
      />
    );
    wrapper.find('button.select-button__icon-wrapper').simulate('click');

    wrapper.find('button.select-button__drop-down-button').last().simulate('click');

    expect(handleChange).toHaveBeenCalledWith('topo_rd_zw');
    expect(wrapper.find('.select-button.select-button--expanded').exists()).toBe(false);
  });

  it('should open the options list when open icon is clicked and close again when body is clicked', () => {
    const wrapper = mount(
      <SelectButton
        className="someclass"
        icon={Icon}
        isDisabled={false}
        name="topography"
        options={options}
      />
    );
    wrapper.find('button.select-button__icon-wrapper').simulate('click');
    expect(wrapper.find('.select-button.select-button--expanded').exists()).toBe(true);

    // clicking outside will hide the drop down
    document.dispatchEvent(new Event('click'));
    wrapper.update();

    expect(wrapper.find('.select-button.select-button--expanded').exists()).toBe(false);
  });
});

describe('rendering', () => {
  it('should render with default value', () => {
    const isDisabled = false;

    const wrapper = shallow(
      <SelectButton
        className="someclass"
        icon={Icon}
        isDisabled={isDisabled}
        name="topography"
        options={options}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with preselected value then make the select button disabled', () => {
    const wrapper = shallow(
      <SelectButton
        className="someclass"
        icon={Icon}
        isDisabled={false}
        name="topography"
        options={options}
        value="topo_rd_light"
      />
    );
    expect(wrapper.find('.select-button.select-button--disabled').exists()).toBe(false);

    wrapper.setProps({ isDisabled: true });
    expect(wrapper.find('.select-button.select-button--disabled').exists()).toBe(true);
  });

  it('should render with no options', () => {
    const wrapper = shallow(
      <SelectButton
        icon={Icon}
        name="topography"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
