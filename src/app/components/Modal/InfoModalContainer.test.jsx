import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import InfoModalContainer from './InfoModalContainer';
import getContents from '../../../shared/services/google-sheet/google-sheet';

jest.mock('../../../shared/services/google-sheet/google-sheet');

describe('InfoModalContainer', () => {
  beforeEach(() => {
    getContents.mockImplementation(() => Promise.resolve({
      entries: [{
        id: 'item0',
        titel: {
          value: 'The title'
        },
        content: {
          value: 'The content'
        }
      }]
    }));
  });
  it('should render', () => {
    const store = configureMockStore()({ ui: { isEmbed: false } });
    const component = shallow(<InfoModalContainer />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });

  it('should set openModal state to false if on embed page', () => {
    const store = configureMockStore()({ ui: { isEmbed: true } });
    const component = shallow(<InfoModalContainer />, { context: { store } }).dive();
    const { open } = component.find('Modal').props();
    expect(open).toBe(false);
  });
});
