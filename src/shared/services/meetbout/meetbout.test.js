import fetchByUri from './meetbout';
import getCenter from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';

jest.mock('../geo-json/geo-json');
jest.mock('../coordinate-reference-system/crs-converter');

describe('The meetbout resource', () => {
  afterEach(() => {
    fetch.mockReset();
  });

  describe('By uri', () => {
    it('fetches a meetbout', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/meetbouten/meetbout/123456';

      fetch.mockResponseOnce(JSON.stringify({
        adres: 'Meetbout address',
        geometrie: { type: 'Point' },
        meetboutidentificatie: 'Meetbout display name 1',
        zakkingssnelheid: '0.12345',
        something: 'abc123'
      }));
      getCenter.mockImplementation(() => ({ x: 1, y: 2 }));
      rdToWgs84.mockImplementation(() => ({ latitude: 3, longitude: 4 }));

      const promise = fetchByUri(uri).then((response) => {
        expect(response).toEqual({
          adres: 'Meetbout address',
          address: 'Meetbout address',
          geometrie: { type: 'Point' },
          label: 'Meetbout display name 1',
          location: { latitude: 3, longitude: 4 },
          meetboutidentificatie: 'Meetbout display name 1',
          zakkingssnelheid: '0.12345',
          speed: 0.12345,
          something: 'abc123'
        });
      });

      expect(fetch.mock.calls[0][0]).toBe(uri);
      return promise;
    });

    it('fetches with empty result object', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/meetbouten/meetbout/123456';

      fetch.mockResponseOnce(JSON.stringify({}));

      const promise = fetchByUri(uri).then((response) => {
        expect(response).toEqual({
          address: undefined,
          label: undefined,
          zakkingssnelheid: undefined,
          speed: NaN,
          location: null
        });
      });

      expect(fetch.mock.calls[0][0]).toBe(uri);
      return promise;
    });
  });
});
