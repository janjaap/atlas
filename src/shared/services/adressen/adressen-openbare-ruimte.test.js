import fetchByUri from './adressen-openbare-ruimte';
import getCenter from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';

jest.mock('../geo-json/geo-json');
jest.mock('../coordinate-reference-system/crs-converter');

describe('The adressen openbare ruimte resource', () => {
  afterEach(() => {
    fetch.mockReset();
  });

  describe('By uri', () => {
    it('fetches an openbare ruimte', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/bag/openbareruimte/123456';

      fetch.mockResponseOnce(JSON.stringify({
        _display: 'Openbare ruimte display name 1',
        geometrie: { type: 'Point' },
        something: 'abc123',
        status: {
          code: '01',
          omschrijving: 'Status description'
        }
      }));
      getCenter.mockImplementation(() => ({ x: 1, y: 2 }));
      rdToWgs84.mockImplementation(() => ({ latitude: 3, longitude: 4 }));

      const promise = fetchByUri(uri).then((response) => {
        expect(response).toEqual({
          _display: 'Openbare ruimte display name 1',
          geometrie: { type: 'Point' },
          label: 'Openbare ruimte display name 1',
          location: { latitude: 3, longitude: 4 },
          something: 'abc123',
          status: {
            code: '01',
            description: 'Status description'
          }
        });
      });

      expect(fetch.mock.calls[0][0]).toBe(uri);
      return promise;
    });

    it('fetches with empty result object', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/bag/openbareruimte/123456';

      fetch.mockResponseOnce(JSON.stringify({}));

      const promise = fetchByUri(uri).then((response) => {
        expect(response).toEqual({
          label: undefined,
          location: null,
          status: {
            code: '',
            description: ''
          }
        });
      });

      expect(fetch.mock.calls[0][0]).toBe(uri);
      return promise;
    });
  });
});
