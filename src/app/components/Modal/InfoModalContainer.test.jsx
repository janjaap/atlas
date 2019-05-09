import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import InfoModalContainer from './InfoModalContainer';

describe('InfoModalContainer', () => {
  it('should render', () => {
    const store = configureMockStore()({ ui: { isEmbed: false } });
    const component = shallow(<InfoModalContainer />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });

  it('should set openModal state to false if on embed page', () => {
    const store = configureMockStore()({ ui: { isEmbed: true } });
    const component = shallow(<InfoModalContainer />, { context: { store } }).dive();
    const state = component.instance().state;
    expect(state.openModal).toBe(false);
  });
});
