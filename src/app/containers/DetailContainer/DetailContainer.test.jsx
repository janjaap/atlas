import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import DetailContainer from './DetailContainer';
import { getDetailEndpoint, isDetailLoading } from '../../../shared/ducks/detail/selectors';
import { getUser } from '../../../shared/ducks/user/user';
import {
  getPanoramaPreview,
  isPanoramaPreviewLoading
} from '../../../panorama/ducks/preview/panorama-preview';

jest.mock('../../../shared/ducks/detail/selectors');
jest.mock('../../../shared/ducks/user/user');
jest.mock('../../../panorama/ducks/preview/panorama-preview');

describe('DetailContainer', () => {
  beforeEach(() => {
    getDetailEndpoint.mockReturnValue('myEndpoint');
    isDetailLoading.mockReturnValue(false);
    getUser.mockReturnValue({});
    getPanoramaPreview.mockReturnValue({});
    isPanoramaPreviewLoading.mockReturnValue(false);
  });

  it('should render', () => {
    const store = configureMockStore()({ ui: { isPrintMode: false } });
    const component = shallow(<DetailContainer />, { context: { store } }).dive();
    expect(component).toMatchSnapshot();
  });
});
