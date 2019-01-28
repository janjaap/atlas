import fetchByUri from './adressen-ligplaats';
import getCenter from '../geo-json/geo-json';
import { rdToWgs84 } from '../coordinate-reference-system/crs-converter';

jest.mock('../geo-json/geo-json');
jest.mock('../coordinate-reference-system/crs-converter');

describe('The adressen ligplaats resource', () => {
  afterEach(() => {
    fetch.mockReset();
  });

  describe('By uri', () => {
    it('fetches a ligplaats', () => {
      const uri = 'https://acc.api.data.amsterdam.nl/bag/ligplaats/123456';

      fetch.mockResponseOnce(JSON.stringify({
        _display: 'Ligplaats display name 1',
        aanduiding_in_onderzoek: true,
        geometrie: { type: 'Point' },
        indicatie_geconstateerd: false,
        something: 'abc123',
        status: { omschrijving: 'Status description', code: '01' }
      }));
      getCenter.mockImplementation(() => ({ x: 1, y: 2 }));
      rdToWgs84.mockImplementation(() => ({ latitude: 3, longitude: 4 }));

      const promise = fetchByUri(uri).then((response) => {
        expect(response).toEqual({
          _display: 'Ligplaats display name 1',
          aanduidingInOnderzoek: true,
          aanduiding_in_onderzoek: true,
          geometrie: { type: 'Point' },
          indicatieGeconstateerd: false,
          indicatie_geconstateerd: false,
          label: 'Ligplaats display name 1',
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
      const uri = 'https://acc.api.data.amsterdam.nl/bag/ligplaats/123456';

      fetch.mockResponseOnce(JSON.stringify({}));

      const promise = fetchByUri(uri).then((response) => {
        expect(response).toEqual({
          aanduidingInOnderzoek: undefined,
          indicatieGeconstateerd: undefined,
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
