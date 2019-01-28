
import search, { fetchRelatedForUser } from './map-search';

import * as address from '../../../shared/services/adressen/adressen-nummeraanduiding';
// import * as monument from '../../../shared/services/monument/monument';
import * as vestiging from '../../../shared/services/vestiging/vestiging';

jest.mock('../../../shared/services/adressen/adressen-nummeraanduiding');
jest.mock('../../../shared/services/monument/monument');
jest.mock('../../../shared/services/vestiging/vestiging');

describe('mapSearch service', () => {
  let user;

  beforeEach(() => {
    user = {
      authenticated: true,
      scopes: [
        'HR/R'
      ],
      name: 'user@amsterdam.nl'
    };
  });

  describe('fetchRelatedForUser', async () => {
    it('should return just the base features when no user related features found', () => {
      const features = [
        {
          properties: {
            type: 'bommenkaart/verdachtgebied' // not in map-search
          }
        }
      ];
      const results = fetchRelatedForUser(user)({ features });
      expect(results).toEqual(features);
    });

    it('should return just the base features when user related features found but user is not authorized', async () => {
      user.scopes = ['CAT/W'];
      const features = [
        {
          properties: {
            type: 'bommenkaart/verdachtgebied' // not in map-search
          }
        },
        {
          properties: {
            id: '0363020012061429',
            type: 'bag/ligplaats',
            uri: 'https://acc.api.data.amsterdam.nl/bag/ligplaats/0363020012061429/'
          }
        }
      ];
      const results = await fetchRelatedForUser(user)({ features });
      expect(results).toEqual(features);
    });

    it('should return the user related features for the standplaats', async () => {
      const features = [
        {
          properties: {
            id: '0363020012061429',
            type: 'bag/standplaats',
            uri: 'https://acc.api.data.amsterdam.nl/bag/ligplaats/0363020012061429/'
          }
        }
      ];
      const vestigingResult = {
        _links: { self: { href: 'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/0363200012109853/' } },
        _display: 'Singel 177',
        landelijk_id: '0363200012109853',
        hoofdadres: true,
        vbo_status: { code: '33', omschrijving: 'Plaats aangewezen' },
        dataset: 'bag'
      };
      address.fetchHoofdadresByStandplaatsId
        .mockImplementation(() => Promise.resolve({ id: 2000 }));
      vestiging.fetchByAddressId
        .mockImplementation(() => Promise.resolve([vestigingResult]));
      const results = await fetchRelatedForUser(user)({ features });
      expect(results).toEqual([...features, {
        ...vestigingResult,
        properties:
        {
          uri: vestigingResult._links.self.href,
          display: vestigingResult._display,
          type: 'vestiging',
          parent: 'bag/standplaats'
        }
      }]);
    });

    it('should return the user related features for the ligplaats', async () => {
      const features = [
        {
          properties: {
            id: '0363020012061429',
            type: 'bag/ligplaats',
            uri: 'https://acc.api.data.amsterdam.nl/bag/ligplaats/0363020012061429/'
          }
        }
      ];
      const vestigingResult = {
        _links: { self: { href: 'https://acc.api.data.amsterdam.nl/bag/nummeraanduiding/0363200012109853/' } },
        _display: 'Singel 177',
        landelijk_id: '0363200012109853',
        hoofdadres: true,
        vbo_status: { code: '33', omschrijving: 'Plaats aangewezen' },
        dataset: 'bag'
      };
      address.fetchHoofdadresByLigplaatsId
        .mockImplementation(() => Promise.resolve({ id: 1000 }));
      vestiging.fetchByAddressId
        .mockImplementation(() => Promise.resolve([vestigingResult]));
      const results = await fetchRelatedForUser(user)({ features });
      expect(results).toEqual([...features, {
        ...vestigingResult,
        properties:
        {
          uri: vestigingResult._links.self.href,
          display: vestigingResult._display,
          type: 'vestiging',
          parent: 'bag/ligplaats'
        }
      }]);
    });
  });

  it('should return results from search ', async () => {
    const mockResponse = {
      features: [
        {
          properties: {
            type: 'bommenkaart/verdachtgebied' // not in map-search
          }
        }
      ]
    };

    global.fetch = jest.fn().mockImplementation(() => (
        new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => mockResponse
          });
        })));

    const data = await search({ latitude: 1, longitude: 0 }, {
      authenticated: false,
      accessToken: '',
      scopes: [],
      name: '',
      error: false
    });
    expect(data).toEqual([{
      categoryLabel: 'Explosief',
      results: Array(7).fill({
        categoryLabel: 'Explosief',
        label: undefined,
        parent: undefined,
        statusLabel: 'verdacht gebied',
        type: 'bommenkaart/verdachtgebied',
        uri: undefined
      }),
      subCategories: [],
      type: 'bommenkaart/verdachtgebied'
    }]);
  });

  it('should return results and ignore the ignore the failing calls (http 500 errors)', async () => {
    const mockResponse = {
      features: [
        {
          properties: {
            type: 'bommenkaart/verdachtgebied' // not in map-search
          }
        }
      ]
    };

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.indexOf('/nap/') > 0) {
        return new Promise(() => {
          throw new Error('nap api not available ');
        });
      }
      return (
        new Promise((resolve) => {
          resolve({
            ok: true,
            json: () => mockResponse
          });
        }));
    });

    const data = await search({ latitude: 1, longitude: 0 }, {
      authenticated: false,
      accessToken: '',
      scopes: [],
      name: '',
      error: false
    });
    expect(data).toEqual([{
      categoryLabel: 'Explosief',
      results: Array(6).fill({
        categoryLabel: 'Explosief',
        label: undefined,
        parent: undefined,
        statusLabel: 'verdacht gebied',
        type: 'bommenkaart/verdachtgebied',
        uri: undefined
      }),
      subCategories: [],
      type: 'bommenkaart/verdachtgebied'
    }]);
  });
});
